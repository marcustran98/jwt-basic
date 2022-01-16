const User = require("../models/User");
const bcrypt = require("bcrypt");
let refreshTokens = [];
const authController = {
    registerUser: async (req, res) => {
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

    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "300s" }
        );
    },

    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
    },

    login: async (req, res) => {
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
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);

                //STORE REFRESH TOKEN IN COOKIE
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });

                const { password, ...userInfo } = user;
                res.status(200).json({
                    ...userInfo,
                    accessToken,
                    refreshToken
                });
            } else {
                res.status(400).json("Wrong pasword");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = authController;