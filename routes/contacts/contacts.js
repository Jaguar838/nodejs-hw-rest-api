const express = require("express");
const router = express.Router();
const guard = require("../../helpers/guard");
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

router.get("/", guard, getContacts);

router.get("/:contactId", guard, validateContactId, getContact);

router.post("/", guard, validateContact, addContact);

router.delete("/:contactId", guard, validateContactId, deleteContact);
router.put(
  "/:contactId",
  guard,
  [(validateContactId, validateContact)],
  updateContact
);
router.patch(
  "/:contactId",
  guard,
  [(validateContactId, validateContactPatch)],
  updateContact
);

module.exports = router;
