import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } from './config.js';

const app = express();

// Tu configuración de Express, rutas, etc.
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT
});

// Método para crear un empleado
app.post("/create", (req, res) => {
  const { nombre, edad, pais, cargo, anios } = req.body;

  const query = 'INSERT INTO empleado (nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, edad, pais, cargo, anios], (err, result) => {
    if (err) {
      console.error("Error al registrar el empleado:", err);
      res.status(500).send("Error al registrar el empleado");
    } else {
      res.status(201).send("Empleado registrado con éxito");
    }
  });
});

// Método para obtener la lista de empleados
app.get("/empleado", (req, res) => {
  const query = 'SELECT * FROM empleado';
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener los empleados:", err);
      res.status(500).send("Error al obtener los empleados");
    } else {
      res.status(200).send(result);
    }
  });
});

// Método para actualizar un empleado
app.put("/update", (req, res) => {
  const { id, nombre, edad, pais, cargo, anios } = req.body;

  const query = 'UPDATE empleado SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?';
  db.query(query, [nombre, edad, pais, cargo, anios, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar el empleado:", err);
      res.status(500).send("Error al actualizar el empleado");
    } else {
      if (result.affectedRows === 0) {
        res.status(404).send("Empleado no encontrado");
      } else {
        res.status(200).send("Empleado actualizado con éxito");
      }
    }
  });
});

//metodo de delete 
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM empleado WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar el empleado:", err);
      res.status(500).send("Error al eliminar el empleado");
    } else {
      if (result.affectedRows === 0) {
        res.status(404).send("Empleado no encontrado");
      } else {
        res.status(200).send("Empleado eliminado con éxito");
      }
    }
  });
});



// Verificar que el servidor esté encendido
app.listen(DB_PORT, () => {
  console.log("Servidor corriendo en el puerto 3001");
});