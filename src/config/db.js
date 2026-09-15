const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function pingDatabase() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database.');

    const res = await client.query('SELECT NOW()');
    console.log('Database Ping Successful. Current time:', res.rows[0].now);

    client.release();
  } catch (err) {
    console.error('Failed to connect to the database:', err.stack);
  } finally {
    if (require.main === module) {
      await pool.end();
    }
  }
}

if (require.main === module) {
  pingDatabase();
}

module.exports = {
  pool,
  pingDatabase
};
