const express = require("express");
const router = express.Router();
const guard = require("../../helpers/guard");
const wrapError = require("../../helpers/errorHandler");
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

router.get("/", guard, wrapError(getContacts));

router.get("/:id", guard, validateContactId, wrapError(getContact));

router.post("/", guard, validateContact, wrapError(addContact));

router.delete("/:id", guard, validateContactId, wrapError(deleteContact));
router.put(
  "/:id",
  guard,
  [(validateContactId, validateContact)],
  wrapError(updateContact)
);
router.patch(
  "/:id/favorite/",
  guard,
  [(validateContactId, validateContactPatch)],
  wrapError(updateContact)
);

module.exports = router;
