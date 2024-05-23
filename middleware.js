module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "you must be logged in to create listing");
        return res.redirect("/login");
    }
    // if(!req.user = req.flash) {
    //     req.flash("error", "you must be logged in to create listing");
    //     return res.redirect("/signup");
    // }
    next();
}