const pool = require('./src/config/db');

async function setupDatabase() {
    try {
        console.log("Setting up database...");
        
        // Create users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Users table created successfully (or already exists).");

    } catch (error) {
        console.error("Error setting up database:", error);
    } finally {
        pool.end();
    }
}

setupDatabase();
