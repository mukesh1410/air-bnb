const express = require("express");
const app = express();
const users = require("./routes/user.js")
const posts = require("./routes/post.js")
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions =  {secret: "mysupersecretstring", resave: false, saveUninitialized: true };

app.use(session(sessionOptions));
app.use(flash());

app.get("/register", (req, res) => {
    let { name= "mukesh" } = req.query;
    req.session.name = name;
    req.flash("success", "user registered successfully");
    res.send(name);
});

app.get("/hello", (req, res) => {
    res.locals.messages = req.flash("success");
    res.render("page.ejs", {name: req.session.name, msg: req.flash("success")});
});

// app.use(cookieParser("secretcode"));

// app.get("/reqcount", (req, res) => {
//     if (req.session.count) {
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${ req.session.count } times`);
// });

app.get("/test", (req, res) => {
    res.send("test sucessfull");
});

// app.get("/getsignedcookie", (req, res) => {
//     res.cookie("vikash", "php", {signed: true});
//     res.send("signed cookie sent");
// });

// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// app.get("/getcookies", (req, res) => {
//     res.cookie("greet", "hello");
//     res.send("sent you some cookies");
// });

// app.get("/greet", (req, res) => {
//     let { name } = req.cookies;
//     res.send(`hii, ${name}`);
// });

// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("Hii, i am root");
// });

// app.use("/users", users);
// app.use("/posts", posts);

app.listen(3000, () => {
    console.log("server is listening to 3000");
});
