const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
      docTitle: "Add Product",
      path: "/admin/add-product",
      editing: false
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

  exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    if(!editMode) {
      return res.redirect("/");
    }
    const prodId = req.params.productId; // routes admin.js router.get("/edit-product/:productId", adminController.getEditProduct);
    Product.findById(prodId, product => {
      if(!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        docTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product
      });
    });
  };

  exports.postEditProduct = (req, res, next) => {

  }

  exports.getProducts = (req,res,next) => {
    Product.fetchAll(products => {
      res.render("admin/products", {
        prods: products,
        docTitle: "Admin Products",
        path: "/admin/products"
      });
    });
  }