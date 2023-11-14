const mongoose = require('mongoose');

const dbConnect = () => {
  const user = 'ArantzaGG';
  const pass = 'bzEeAXe4H9NUtkDT';
  const dbName = 'Netflix';

  const uri = `mongodb+srv://${user}:${pass}@cluster0.iibkh4b.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  // mongodb+srv://ArantzaGG:<password>@cluster0.iibkh4b.mongodb.net/?retryWrites=true&w=majority

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conectado a MongoDB'))
    .catch((e) => console.log('error de conexión', e));
};
module.exports = dbConnect;
