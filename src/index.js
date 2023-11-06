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
server.get('/movies/:idMovies', (req, res) => {
  // const idMovies = req.params.id;

  // getMoviesFromId(idMovies, (error, user) => {
  //   if (error) return res.status(500).send(error);
  //   res.status(200).send(user);

  // });
  console.log('idMovies:', req.params);
});
