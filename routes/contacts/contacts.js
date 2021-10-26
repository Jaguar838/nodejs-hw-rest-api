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

router.get("/:id", guard, validateContactId, getContact);

router.post("/", guard, validateContact, addContact);

router.delete("/:id", guard, validateContactId, deleteContact);
router.put(
  "/:id",
  guard,
  [(validateContactId, validateContact)],
  updateContact
);
router.patch(
  "/:id/favorite/",
  guard,
  [(validateContactId, validateContactPatch)],
  updateContact
);

module.exports = router;
