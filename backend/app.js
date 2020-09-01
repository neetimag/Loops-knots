const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const session = require("express-session");
const path = require("path");
const Mongostore = require("connect-mongodb-session")(session);
const passportstrategy = require("./config/passport");
const passport = require("passport");
const flash = require("connect-flash");

const app = express();

const MongoURI =
    "mongodb+srv://Admin12345:<password>@cluster0.be1um.mongodb.net/<dbname>?retryWrites=true&w=majority";

const store = new Mongostore({
    uri: MongoURI,
    collection: "loopsession",
});

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(flash());
app.use(
    session({
        saveUninitialized: false,
        resave: false,
        store: store,
        secret: "loopsandknotsidkmaybeooops",
    })
);

app.use(passport.initialize());
app.use(passport.session());

const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

app.use(shopRoutes);
app.use(adminRoutes);
app.use("/auth", authRoutes);

mongoose
    .connect(MongoURI)
    .then((client) => {
        console.log("connected");
        app.listen(5000);
    })
    .catch((err) => {
        console.log("err");
    });