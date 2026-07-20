const pool = require('../config/db.config')
const bcrypt = require('bcryptjs')

const BASE_SELECT = `
    SELECT u.id, u.nome, u.email, u.tipo, u.created_at, a.id AS artist_id,
        a.verificado AS artist_verificado
    FROM users u
    LEFT JOIN artists a 
    ON a.user_id = u.id
    
`;

// GET /api/users
exports.findAll = async (req, res) => {
    try {
        const { tipo, q } = req.query;
        const conditions = [];
        const values = [];

        if (tipo) {
            values.push(tipo);
            conditions.push(`u.tipo = $${values.length}`);
        }
        if (q) {
            values.push(`%${q}%`);
            const i = values.length;
            conditions.push(`(u.nome ILIKE $${i} OR u.email LIKE $${i})`);
        }

        const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        const result = await pool.query(`${BASE_SELECT} ${where} ORDER BY u.nome`,
            values);
        res.json(result.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

// GET /api/users/:id
exports.findOne = async (req, res) => {
    try {
        const result = await pool.query(`${BASE_SELECT} WHERE u.id = $1`, [req.params.id]);

        if (result.rows.length == 0)
            return res.status(404).json({ error: "Not found" });
        res.json(result.rows[0])
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// POST /api/users/register
exports.create = async (req, res) => {
    const{ nome, email, password} = req.body;
    
    if (!nome || !email || !password) {
        return res.status(400).json({ error: 'nome, email and password are required' });
    }

    try {
        const password_hash = await bcrypt.hash(password, 10);

        const result = await pool.query(`INSERT INTO users (nome, email, password_hash, tipo)
            VALUES ($1, $2, $3, 'base')
            RETURNING id, nome, email, tipo, created_at`,
            [nome, email, password_hash]
        );

        res.status(201).json({ user: result.rows[0]});
    } catch (e) {
        if (e.code === '23505') {
            return res.status(409).json({ error: 'Email already in use' });
        }
        res.status(500).json({ error: e.message });
    }
}