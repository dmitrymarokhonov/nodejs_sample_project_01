const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
      docTitle: "Add Product",
      path: "/admin/add-product",
      activeAddProduct: true,
      formsCSS: true,
      productCSS: true
    });
  };
  
  exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const product = new Product(title, price, imageUrl, description);
    product.save();
    res.redirect("/");
  };

  exports.getProducts = (req,res,next) => {
    Product.fetchAll(products => {
      res.render("admin/products", {
        prods: products,
        docTitle: "Admin Products",
        path: "/admin/products"
      });
    });
  }