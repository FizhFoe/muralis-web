const pool = require('../config/db.config');

// GET /api/categories
exports.findAll = async (req, res) => {
    try {
        const query = await pool.query('select id, nome, descricao from categories c order by c.nome');
        res.json(query.rows);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// GET /api/categories/:id
exports.findOne = async (req, res) => {
    try {
        const result = await pool.query(`select id, nome, descricao from categories where id = $1`, [req.params.id]);

        if (result.rows.length === 0)
            return res.status(404).json({ error: "Not Found" });
        res.json(result.rows[0]);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}