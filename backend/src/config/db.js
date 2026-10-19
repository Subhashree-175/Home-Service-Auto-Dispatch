/**
 * PostgreSQL connection pool.
 * Supports local PostgreSQL and Neon PostgreSQL.
 */
require('dotenv').config();
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'emergency_dispatch',

  // Require SSL when connecting to the production database.
  ...(isProduction && {
    ssl: {
      rejectUnauthorized: true,
    },
  }),

  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('[db] Unexpected pool error:', err.message);
});

module.exports = pool;