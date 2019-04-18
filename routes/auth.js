const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

/* GET home page. */
router.get('/', (request, response, next) => {
    response.render('signup');
});

router.get("/signup", (request, response, next) => {
    response.render("auth/signup");
});

router.post("/signup", (request, response, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    if (username === "" || password === "") {
        response.render("auth/signup", {
            errorMessage: "Indicate a username and a password to sign up"
        });

        User.create({
            username,
            password: hashPass
        })
            .then(() => {
                res.redirect("/");
            })
            .catch(error => {
                console.log(error);
            })
    }});

module.exports = router;