const db = require("../utils/database");

const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, price, imageUrl, description) {
    (this.id = id), (this.title = title);
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO Products (title, price, description, imageUrl) VALUES (?,?,?,?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM Products");
  }

  static findById(id) {
    return db.execute("SELECT * from Products WHERE Products.id = ?", [id])
  }
};
