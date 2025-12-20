const express = require("express")
const {loginUser,registerUser,currentUser} = require("../controllers/userControllers")
const { validateToken } = require("../middlewares/validateTokenHandler")
const router = express.Router()

router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.route("/current").get(validateToken,currentUser) 

module.exports = router