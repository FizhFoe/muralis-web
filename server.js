require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./app/config/db.config');
// const User = require('./models/User');
const artistsRoutes = require('./app/routes/artists.routes')

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('API Running');
});

app.use('/api/artists', artistsRoutes);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// // Rotas de exemplo usando o modelo User
// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.findAll();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.get('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) return res.status(404).json({ error: 'Utilizador não encontrado' });
//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.post('/users', async (req, res) => {
//     try {
//         const { name, email } = req.body;
//         const newUser = await User.create({ name, email });
//         res.status(201).json(newUser);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.put('/users/:id', async (req, res) => {
//     try {
//         const { name, email } = req.body;
//         const updatedUser = await User.update(req.params.id, { name, email });
//         if (!updatedUser) return res.status(404).json({ error: 'Utilizador não encontrado' });
//         res.json(updatedUser);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.delete('/users/:id', async (req, res) => {
//     try {
//         const deletedUser = await User.remove(req.params.id);
//         if (!deletedUser) return res.status(404).json({ error: 'Utilizador não encontrado' });
//         res.json({ message: 'Utilizador removido com sucesso' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
