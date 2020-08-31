const router = require("express").Router();
const adminControllers = require("../controllers/admin");

const isadmin = require('../helper/isadmin');

router.get("/addproductform", isadmin, adminControllers.getaddproductform);
router.post("/addproduct", isadmin , adminControllers.postaddproduct);


module.exports = router;