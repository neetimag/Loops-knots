const Product = require("../model/product");

exports.getaddproductform = (req, res, next) => {
  res.render("form1");
};

exports.postaddproduct = (req, res, next) => {
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const manufactured = req.body.manufactured;
  const price = req.body.price;
  const imgurl = req.body.imgurl;

  const prefer28 = req.body.prefer28;
  const prefer30a = req.body.prefer30a;
  const prefer30b = req.body.prefer30b;
  const prefer30c = req.body.prefer30c;
  const prefer30d = req.body.prefer30d;
  const prefer32a = req.body.prefer32a;
  const prefer32b = req.body.prefer32b;
  const prefer32c = req.body.prefer32c;
  const prefer32d = req.body.prefer32d;
  const prefer34a = req.body.prefer34a;
  const prefer34b = req.body.prefer34b;
  const prefer34c = req.body.prefer34c;
  const prefer34d = req.body.prefer34d;
  const prefer36a = req.body.prefer36a;
  const prefer36b = req.body.prefer36b;
  const prefer36c = req.body.prefer36c;
  const prefer36d = req.body.prefer36d;
  const prefer40a = req.body.prefer40a;
  const prefer40b = req.body.prefer40b;
  const prefer40c = req.body.prefer40c;
  const prefer40d = req.body.prefer40d;
  const prefer42a = req.body.prefer42a;
  const prefer42b = req.body.prefer42b;
  const prefer42c = req.body.prefer42c;
  const prefer42d = req.body.prefer42d;
  const prefer44a = req.body.prefer44a;
  const prefer44b = req.body.prefer44b;
  const prefer44c = req.body.prefer44c;
  const prefer44d = req.body.prefer44d;
  const preferXS = req.body.preferXS;
  const preferS = req.body.preferS;
  const preferM = req.body.preferM;
  const preferL = req.body.preferL;
  const preferXL = req.body.preferXL;
  const preferXXL = req.body.preferXXL;

  const preferred = req.body.preferred;
  const preferblue = req.body.preferblue;
  const prefergreen = req.body.prefergreen;
  const preferorange = req.body.preferorange;
  const prefervoilet = req.body.prefervoilet;
  const preferblack = req.body.preferblack;
  const prefercarnation = req.body.prefercarnation;
  const preferyelloworange = req.body.preferyelloworange;
  const preferbluegreen = req.body.preferbluegreen;
  const preferredvoilet = req.body.preferredvoilet;
  const preferredorange = req.body.preferredorange;
  const preferyellowgreen = req.body.preferyellowgreen;
  const preferbluevoilet = req.body.preferbluevoilet;
  const preferwhite = req.body.preferwhite;
  const prefervoiletred = req.body.prefervoiletred;
  const preferdandelion = req.body.preferdandelion;
  const prefercerulean = req.body.prefercerulean;
  const preferapricot = req.body.preferapricot;
  const preferscarlet = req.body.preferscarlet;
  const prefergreenyellow = req.body.prefergreenyellow;
  const preferindigo = req.body.preferindigo;
  const prefergray = req.body.prefergray;

  const size = [];

  size.push(
    prefer28,
    prefer30a,
    prefer30b,
    prefer30c,
    prefer30d,
    prefer32a,
    prefer32b,
    prefer32c,
    prefer32d,
    prefer34a,
    prefer34b,
    prefer34c,
    prefer34d,
    prefer36a,
    prefer36b,
    prefer36c,
    prefer36d,
    prefer40a,
    prefer40b,
    prefer40c,
    prefer40d,
    prefer42a,
    prefer42b,
    prefer42c,
    prefer42d,
    prefer44a,
    prefer44b,
    prefer44c,
    prefer44d,
    preferXS,
    preferS,
    preferM,
    preferL,
    preferXL,
    preferXXL
  );
  const newsize = size.filter((s) => {
    return s !== undefined;
  });

  const colors = [];

  colors.push(
    preferred,
    preferblue,
    prefergreen,
    preferorange,
    prefervoilet,
    preferblack,
    prefercarnation,
    preferyelloworange,
    preferbluegreen,
    preferredvoilet,
    preferredorange,
    preferyellowgreen,
    preferbluevoilet,
    preferwhite,
    prefervoiletred,
    preferdandelion,
    prefercerulean,
    preferapricot,
    preferscarlet,
    prefergreenyellow,
    preferindigo,
    prefergray
  );

  const sortedcolor = colors.filter((color) => {
    return color !== undefined;
  });

  const newproduct = new Product({
    name: name,
    category: category,
    description: description,
    manufactured: manufactured,
    imgurl: imgurl,
    price: price,
    size: newsize,
    colors: sortedcolor,
  });

  newproduct.save().then((result) => {
    res.redirect('/');
  });
};
