const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;
class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
    // this._id = id ? ObjectId(id) : null;
  }
  save() {
    const db = getdDb();
    let dbOp;
    if (this._id) {
      // dbOp = db.collection("users").updateOne({_id: this._id}, {$set: this});
    } else {
      dbOp = db.collection("users").insertOne(this);
    }
    return dbOp.then(res => console.log(res)).catch(err => console.log(err));
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => console.log(err));
  }
}

module.exports = User;
