const express = require("express");
const router = express.Router();

const {
  validateContactId,
  validateContact,
  validateContactPatch,
} = require("./validation");

const {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
} = require("../../controllers/contacts");

router.get("/", getContacts);

router.get("/:contactId", validateContactId, getContact);

router.post("/", validateContact, addContact);

router.delete("/:contactId", validateContactId, deleteContact);
router.put("/:contactId", validateContactId, validateContact, updateContact);
router.patch(
  "/:contactId",
  validateContactId,
  validateContactPatch,
  updateContact
);

module.exports = router;
