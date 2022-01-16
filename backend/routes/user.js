const router = require("express").Router();

const controller = require("../controllers/user.controller");

const {
    verifyToken,
    verifyTokenAndUserAuthorization,
    isAdmin
} = require("../controllers/middleware.controller");

router.post("/", verifyToken, controller.getAllUsers);
router.delete("/:id", verifyTokenAndUserAuthorization, controller.deleteUser);

module.exports = router;