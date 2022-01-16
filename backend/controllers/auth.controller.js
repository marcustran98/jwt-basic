const User = require("../models/User");
const bcrypt = require("bcrypt");
const authController = {
    registerUser: async(req, res) => {
        console.log("req", req.body);
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });

            //save to db

            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    login: async(req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.status(400).json("Wrong username");
            }
            const password = res.body.password;
            if (!password) {
                res.status(400).json("Password is required");
            }
            const validPassword = bcrypt.compare(
                req.body.pasword,
                user.password
            )
            if (validPassword) {
                res.status(200).json(user);
            } else {
                res.status(400).json("Wrong pasword");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = authController;