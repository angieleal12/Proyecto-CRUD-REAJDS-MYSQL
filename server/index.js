const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Obtener empleados (GET)
app.get("/empleados", async (req, res) => {
    try {
        const [result] = await db.query("SELECT * FROM empleados");
        res.send(result);
    } catch (err) {
        console.error("Error en la consulta:", err);
        res.status(500).send("Error al obtener empleados");
    }
});

// 2. Crear empleado (POST)
app.post('/empleados', async (req, res) => {
    const { nombre, edad, pais, cargo, anios } = req.body;
    const sql = 'INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)';

    try {
        const [result] = await db.query(sql, [nombre, edad, pais, cargo, anios]);
        res.json({
            message: 'Empleado guardado correctamente',
            id: result.insertId,
            nombre, edad, pais, cargo, anios
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al guardar los datos' });
    }
});

// 3. Actualizar empleado (PUT)
app.put('/empleados/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, edad, pais, cargo, anios } = req.body;
    const sql = 'UPDATE empleados SET nombre = ?, edad = ?, pais = ?, cargo = ?, anios = ? WHERE id = ?';

    try {
        await db.query(sql, [nombre, edad, pais, cargo, anios, id]);
        res.json({ message: 'Empleado actualizado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar' });
    }
});

// 4. Eliminar empleado (DELETE)
app.delete('/empleados/:id', async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM empleados WHERE id = ?';

    try {
        await db.query(sql, [id]);
        res.json({ message: 'Empleado eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar' });
    }
});

app.listen(3001, () => {
    console.log('Servidor del backend corriendo en el puerto 3001');
});