import pool from "../config/db.js";

export async function addSchool({ name, address, latitude, longitude }) {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
            [name, address, latitude, longitude]
        );
        return result.insertId;
    } finally {
        connection.release();
    }
}

export async function getAllSchools() {
    const connection = await pool.getConnection();
    try {
        const [schools] = await connection.query("SELECT * FROM schools");
        return schools;
    } finally {
        connection.release();
    }
}
