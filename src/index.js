const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');
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
    password: '12aran12',
  });
  connection.connect();

  return connection;
}

// CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC

server.get('/movies/:idMovies', async (req, res) => {
  const conn = await getConnection();
  const idMovies = req.params.idMovies;
  const foundMovie = `SELECT * FROM movies WHERE idMovies = ?`;
  const [results] = await conn.query(foundMovie, [idMovies]);
  console.log(results[0]);
  res.render('movie', results[0]);

  conn.end();
});

server.get('/movies', async (req, res) => {
  const conn = await getConnection();
  const params = req.query;
  const genre = req.query.genre;

  let queryMovies = '';

  console.log(genre);

  if (genre !== '') {
    queryMovies = `SELECT * FROM movies WHERE genre = "${genre}" ORDER BY title ASC`;
  } else {
    queryMovies = `SELECT * FROM movies ORDER BY title ASC`;
  }

  const [results] = await conn.query(queryMovies);

  res.json({
    success: true,
    movies: results,
  });

  conn.end();
});

// Parte del fichero src/index.js

// Configuración del primer servidor de estáticos
const staticServerPathWeb = './web';
server.use(express.static(staticServerPathWeb));
