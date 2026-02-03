const mysql = require('mysql2');
require('dotenv').config();

// 1. Usamos createPool en lugar de createConnection para mayor estabilidad
const connection = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1', // Prioriza IPv4 para evitar el error ECONNREFUSED
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connection.getConnection((err, conn) => {
    if (err) {
        console.error('❌ Error al conectar la base de datos:');
        
        // Explicación detallada según el tipo de error
        if (err.code === 'ECONNREFUSED') {
            console.error('--- Asegúrate de que el servidor MySQL (XAMPP/Wamp) esté ENCENDIDO ---');
        }
        return; // Detiene la ejecución si hay error
    }

    console.log('✅ Conexión exitosa a la base de datos MySQL');
    conn.release(); // Libera la conexión de prueba al pool
});

// Exportamos el pool para usarlo en tus rutas (usa .promise() si quieres usar async/await)
module.exports = connection.promise();
