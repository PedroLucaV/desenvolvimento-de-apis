import mysql from 'mysql2';

const conn = mysql.createPool({
    connectionLimit: 10,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    port:process.env.DB_PORT
});

try {
    console.log("Mysql conectado")
} catch (error) {
    console.error(error)
}

export default conn;