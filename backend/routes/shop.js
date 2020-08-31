const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");
const isauth = require("../helper/isauth");

router.get("/", shopController.gethome);

router.get("/about", shopController.getabout);

router.get("/blog", shopController.getblog);

router.get("/blogsingle", shopController.getblogsingle);

router.get("/cart", isauth, shopController.getcart);

router.get("/checkout", isauth, shopController.getcheckout);

router.get("/contact", shopController.getcontact);

router.get("/login", shopController.getlogin);

router.get("/product", shopController.getproduct);

router.get("/productsingle", shopController.getproductsingle);

router.get("/productdetails/:prodid" , shopController.getproductdetails);

router.get("/addcart/:prodid" , shopController.getaddcart);

router.get("/deletecartitem/:productid" , shopController.getdeletecartitems);

router.get("/paywithcard/:total" , shopController.getpaywithcard);

router.post("/orders" , shopController.postorders);

router.get('/panties' , shopController.getpanties);

router.get('/bra' , shopController.getbra);

module.exports = router;
