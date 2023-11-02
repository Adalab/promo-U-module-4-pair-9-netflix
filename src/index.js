const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'netflix',
    password: 'Ainhoamiamor1',
  });
  connection.connect();

  return connection;
}

// CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC

server.get('/movies', async (req, res) => {
  const conn = await getConnection();

  const queryMovies = 'SELECT * FROM movies';

  const [results] = await conn.query(queryMovies);
  res.json({
    success: true,
    movies: results,
  });
  conn.end();
});
