const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://dmitry:KUyt17sX88iDUKnM@cluster0-qvwe4.mongodb.net/shop?retryWrites=true",
    { useNewUrlParser: true }
  )
    .then(client => {
      console.log("Connected!");
      _db = client.db();
      callback(client);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No database found!";
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
