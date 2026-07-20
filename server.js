require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./app/config/db.config');
// const User = require('./models/User');
const artistsRoutes = require('./app/routes/artists.routes')
const usersRoutes = require('./app/routes/users.routes')

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('API Running');
});

app.use('/api/artists', artistsRoutes);
app.use('/api/users', usersRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));