const Product = require("../model/product");
const User = require("../model/user");
const Order = require("../model/order");

const stripe = require("stripe")(
  "sk_test_51HKv9gEz43ANUvDLBnIsGj6Qc9xLL4Heva3Y3Ltci9TJJZ7kda9np67vwOLUU6UEZwFDj0WWhvQyRodmes3yCBR400d0huEuJx"
);

exports.gethome = (req, res, next) => {
  res.render("index", {
    user: req.user,
  });
};

exports.getabout = (req, res, next) => {
  res.render("about", {
    user: req.user,
  });
};

exports.getblog = (req, res, next) => {
  res.render("blog", {
    user: req.user,
  });
};

exports.getblogsingle = (req, res, next) => {
  res.render("blogsingle", {
    user: req.user,
  });
};

exports.getcart = (req, res, next) => {
  let total = 0;
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      console.log(user);
      cartitems = user.cart.items;
      console.log(user.cart.items);
      cartitems.forEach((item) => {
        total += item.quantity * item.productId.price;
      });
      console.log(total);
      res.render("cart", {
        products: cartitems,
        total: total,
        user: req.user,
      });
    });
};

exports.getcheckout = (req, res, next) => {
  let total = 0;
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      console.log(user.cart.items);
      const cartitems = user.cart.items;
      cartitems.forEach((item) => {
        total += item.quantity * item.productId.price;
      });

      res.render("checkout", {
        total: total,
        user: req.user,
      });
    });
};

exports.getcontact = (req, res, next) => {
  res.render("contact", {
    user: req.user,
  });
};

exports.getlogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("login", {
    error: message,
  });
};

exports.getproduct = (req, res, next) => {
  Product.find().then((products) => {
    res.render("product", {
      allproducts: products,
      user: req.user,
    });
  });
};

exports.getproductsingle = (req, res, next) => {
  res.render("productsingle", {
    user: req.user,
  });
};

exports.getproductdetails = (req, res, next) => {
  id = req.params.prodid;

  Product.findById(id).then((product) => {
    console.log(product);
    res.render("productsingle", {
      productdetails: product,
      user: req.user,
    });
  });
};

exports.getaddcart = (req, res, next) => {
  const productid = req.params.prodid;
  Product.findById(productid)
    .then((product) => {
      return req.user.addtocart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/product");
    });
};

exports.getdeletecartitems = (req, res, next) => {
  const prodid = req.params.productid;
  console.log(prodid);
  req.user.removefromcart(prodid).then((result) => {
    res.redirect("/cart");
  });
};

exports.getpaywithcard = (req, res, next) => {
  const total = req.params.total;
  res.render("paywithcard", {
    totalamt: total,
  });
};

exports.postorders = (req, res, next) => {
  const token = req.body.stripeToken; // Using Express
  let totalSum = 0;

  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      user.cart.items.forEach((p) => {
        totalSum += p.quantity * p.productId.price;
      });

      const products = user.cart.items.map((item) => {
        return { product: { ...item.productId._doc } };
      });
      const neworder = new Order({
        products: products,
        user: {
          name: req.user.name,
          userid: req.user._id,
        },
      });
      return neworder.save();
    })
    .then((result) => {
      req.user.clearcart();
      const charge = stripe.charges.create({
        amount: totalSum * 100,
        currency: "inr",
        description: "Demo Order",
        source: token,
        metadata: { order_id: result._id.toString() },
      });
      var customer = stripe.customers.create({
        name: result.user.name,
      });
      console.log(result);
      res.redirect("/");
    });
};

exports.getpanties = (req, res, next) => {
  Product.find({ category: "panties" }).then((products) => {
    res.render("product", {
      allproducts: products,
      user: req.user,
    });
  });
};

exports.getbra = (req, res, next) => {
  Product.find({ category: "bra" }).then((products) => {
    res.render("product", {
      allproducts: products,
      user: req.user,
    });
  });
};