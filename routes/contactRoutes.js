const express = require("express");
const router = express.Router();
const {getContact,createContact,getContacts,UpdateContact,deleteContact} = require("../controller/contactController")


router.route("/").get(getContact)

router.route("/").post(createContact)

router.route("/:id").get(getContacts)

router.route("/:id").put(UpdateContact)

router.route("/:id").delete(deleteContact)

module.exports = router