const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
  },
  category: String,
  description: String,
  manufactured: String,
  imgurl : String,
  price : Number,
  size : [],
  colors : []
});




module.exports = mongoose.model('Product' , productSchema);