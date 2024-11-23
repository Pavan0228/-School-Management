import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();


const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const pool = createPool(dbConfig);

const createTableSQL = `
    CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CHECK (latitude BETWEEN -90 AND 90),
        CHECK (longitude BETWEEN -180 AND 180)
    )
`;

export async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        await connection.query(createTableSQL);
        connection.release();
        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Database initialization failed:", error);
        process.exit(1);
    }
}

export default pool;
