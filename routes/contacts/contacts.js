const express = require("express");
const router = express.Router();
const {
  validateContact,
  validateContactPatch,
  validateContactId,
} = require("./validation");

const {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
} = require("../../controllers/contacts");

router.get("/", getContacts);

router.get("/:id", validateContactId, getContact);

router.post("/", validateContact, addContact);

router.delete("/:id", validateContactId, deleteContact);

router.put("/:id", [validateContactId, validateContact], updateContact);

router.patch(
  "/:id/favorite/",
  [validateContactId, validateContactPatch],
  updateContact
);

module.exports = router;
