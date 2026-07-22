const bcrypt = require('bcryptjs');
const pool = require('../config/db.config')

/**
 * 
// Shared SELECT used by findAll and findOne.
// Joins users for identity, and uses LATERAL subqueries to attach:
//   - categorias: a JSON array of the artist's craft category names
//   - avg_rating / total_reviews: aggregated from reviews
// LATERAL keeps this a single row per artist (no GROUP BY needed).
 */
const BASE_SELECT = `
  SELECT a.id, a.user_id, a.bio, a.cidade, a.distrito, a.foto_perfil,
        a.verificado, a.contacto, a.created_at,
        u.nome, u.email,
        COALESCE(cat.categorias, '[]'::json) AS categorias,
        COALESCE(rev.avg_rating, 0)::float AS avg_rating,
        COALESCE(rev.total_reviews, 0)::int AS total_reviews
        FROM artists a
        JOIN users u ON u.id = a.user_id
        LEFT JOIN LATERAL (
            SELECT json_agg(c.nome) AS categorias
            FROM artist_categories ac
            JOIN categories c ON c.id = ac.category_id
            WHERE ac.artist_id = a.id
        ) cat ON true
        LEFT JOIN LATERAL (
            SELECT AVG(r.rating) AS avg_rating, COUNT(*) AS total_reviews
            FROM reviews r
            WHERE r.artist_id = a.id
        ) rev ON true
`;

// GET /api/artists
exports.findAll = async (req, res) => {
    try {
        const { cidade, distrito, verificado, category, q } = req.query;
        const conditions = [];
        const values = [];

        if (cidade) {
            values.push(cidade);
            conditions.push(`a.cidade ILIKE $${values.length}`)
        }
        if (distrito) {
            values.push(distrito);
            conditions.push(`a.distrito ILIKE $${values.length}`)
        }
        if (verificado !== undefined) {
            values.push(verificado === 'true');
            conditions.push(`a.verificado = $${values.length}`);
        }
        if (category) {
            values.push(category);
            conditions.push(`EXISTS (
                SELECT 1 FROM artist_categories ac
                JOIN categories c ON c.id = ac.category_id
                WHERE ac.artist_id = a.id AND c.nome ILIKE $${values.length}
                )`);
        }
        if (q) {
            values.push(`%${q}%`);
            const i = values.length;
            conditions.push(`(a.bio ILIKE $${i} OR u.nome ILIKE $${i})`);
        }

        const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        const result = await pool.query(`${BASE_SELECT} ${where} ORDER BY u.nome`, values);
        res.json(result.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// GET /api/artists/:id
exports.findOne = async (req, res) => {
    try {
        const result = await pool.query(`${BASE_SELECT} WHERE a.id = $1`, [req.params.id]);

        if (result.rows.length == 0) {
            return res.status(404).json({ error: 'Not Found' });
        }
        res.json(result.rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// POST /api/artists/registar
exports.registerAsArtist = async (req, res) => {
    const { nome, email, password, bio, cidade, distrito, foto_perfil, contacto } = req.body;

    if (!nome || !email || !password) {
        return res.status(400).json({ error: 'nome, email and password are required' });
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const password_hash = await bcrypt.hash(password, 10);

        const userResult = await client.query(`INSERT INTO users (nome, email, password_hash, tipo) 
                VALUES ($1, $2, $3, 'artista')
                RETURNING id, nome, email, tipo, created_at`,
            [nome, email, password_hash]);

        const user = userResult.rows[0];
        const artistResult = await client.query(
            `INSERT INTO artists (user_id, bio, cidade, distrito, foto_perfil, contacto, verificado)
                VALUES ($1, $2, $3, $4, $5, $6, false)
                RETURNING *`,
            [user.id, bio, cidade, distrito, foto_perfil, contacto]
        );

        await client.query('COMMIT');
        res.status(201).json({ user, artist: artistResult.rows[0] });
    } catch (e) {
        await client.query('ROLLBACK');
        // erro 23505 do postgresql
        if (e.code === '23505') {
            return res.status(409).json({ error: 'Email already in use ' });
        }
        res.status(500).json({ error: e.message });
    } finally {
        client.release();
    }
};

// POST /api/artists
exports.create = async (req, res) => {
    try {
        const { user_id, bio, cidade, distrito, foto_perfil, contacto } = req.body;

        if (!user_id)
            return res.status(400).json({ error: 'user_id is required' });

        const result = await pool.query(`
                INSERT INTO artists (user_id, bio, cidade, distrito, contacto, verificado)
                VALUES ($1,$2,$3,$4,$5,false) RETURNING *`,
            [user_id, bio, cidade, distrito, contacto]
        );

        res.status(201).json(result.rows[0]);
    } catch (e) {
        if (e.code === '23503') {
            return res.status(409).json({ error: 'user_id does not reference an existing user' });
        }

        if (e.code === '23505') {
            return res.status(409).json({ error: 'User already register has an artist' });
        }

        res.status(500).json({ error: e.message });
    }
};

// PUT /api/artists/:id/edit
exports.update = async (req, res) => {
    try {
        const allowedFields = ['bio', 'cidade', 'distrito', 'foto_perfil', 'contacto'];
        const updates = [];
        const values = [];

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                values.push(req.body[field]);
                updates.push(`${field} = $${values.length}`);
            }
        }

        if (updates.length === 0)
            return res.status(400).json({ error: 'Sem campos válidos para atualizar' });

        values.push(req.params.id);

        const result = await pool.query(`
                UPDATE artists
                SET ${updates.join(', ')}
                WHERE id = $${values.length} RETURNING *`,
            values
        );

        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Not Found' });

        res.status(201).json(result.rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// DELETE /api/artist/:id
exports.delete = async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM artists WHERE id = $1 RETURNING *', [req.params.id]);

        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Not Found' });

        res.json({ message: 'Deleted sucessfully'});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}