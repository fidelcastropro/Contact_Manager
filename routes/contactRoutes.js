const express = require("express")
const router = express.Router()
const {getAllContacts,getOneContact,createContact,updateContact,deleteContact} = require("../controllers/contactControllers")
const { validateToken } = require("../middlewares/validateTokenHandler")

router.use(validateToken)
router.route("/").get(getAllContacts)

router.route("/").post(createContact)

router.route("/:id").get(getOneContact)

router.route("/:id").put(updateContact)

router.route("/:id").delete(deleteContact)

module.exports = router