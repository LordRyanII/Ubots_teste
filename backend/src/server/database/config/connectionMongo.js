require('dotenv').config()
const mongoose = require('mongoose');

module.exports = class Database {
  constructor(chave) {
    this.chave = chave;
  }
  
  connect() {
    const database = mongoose.connect(this.chave)
      .then(() => {
        console.log('----------------------------------------------');
        console.log('MongoDb connection successful');
        console.error('---------------------------------------------------------');
      })
      .catch((e) => {
        console.error('----------------------------------------------------------');
        console.error('MongoDb connection error' + e);
        console.error('----------------------------------------------------------');
      });
  }

  closed() {
    this.database.disconnect()
  }
}