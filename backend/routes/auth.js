const router = require("express").Router();

const passport = require("passport");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
    "/redirect",
    passport.authenticate("google", { failureRedirect: "/auth/login" }),
    (req, res, next) => {
        if (req.user.googleid === '113542062341119273427') {
            req.session.isadmin = true;
            return res.redirect('/addproductform');
        }
        console.log(req.user);
        return res.redirect("/");
    }
);

router.get("/logout", (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

router.post("/fakelogin", (req, res, next) => {
    req.flash("error", "INVALID EMAIL OR PASSWORD");
    res.redirect("/login");
});

module.exports = router;