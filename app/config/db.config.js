require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,               // nº máximo de ligações no pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('Erro inesperado no pool do PostgreSQL', err);
  process.exit(-1);
});

// Testa a ligação assim que o módulo é carregado
pool.query('SELECT NOW()')
  .then(() => console.log('PostgreSQL connected'))
  .catch((err) => console.error('Erro ao ligar ao PostgreSQL:', err.message));

module.exports = pool;