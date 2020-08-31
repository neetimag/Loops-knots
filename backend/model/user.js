const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  googleid: {
    type: String,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        totalsum: {
          type: Number,
          require: true,
        },
      },
    ],
  },
});

userSchema.methods.addtocart = function (product) {
  const productindex = this.cart.items.findIndex((index) => {
    return index.productId.toString() === product._id.toString();
  });

  let newquantity = 1;

  const updatedcartitems = [...this.cart.items];
  if (productindex >= 0) {
    updatedcartitems[productindex].quantity += 1;
    updatedcartitems[productindex].totalsum += product.price;
  } else {
    updatedcartitems.push({
      productId: product._id,
      quantity: newquantity,
      totalsum: product.price,
    });
  }

  const updatedcart = {
    items: updatedcartitems,
  };

  this.cart = updatedcart;

  return this.save();
};

userSchema.methods.removefromcart = function (productid , price) {
  const usercartitems = [...this.cart.items];
  console.log(usercartitems);
  const updatedcartitems = usercartitems.filter((item) => {
    return item.productId.toString() !== productid.toString();
  });
           
  const userupdatedcart = {
    items: updatedcartitems,
  };
  this.cart = userupdatedcart;

  return this.save();
};

userSchema.methods.clearcart = function(){
  this.cart = {
    items : []
  }

  return this.save();
}

module.exports = mongoose.model("User", userSchema);
