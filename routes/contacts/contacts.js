const express = require("express");
const router = express.Router();
const guard = require("../../helpers/guard");
const wrapError = require("../../helpers/errorHandler");
const role = require("../../helpers/role");
const { Gender } = require("../../config/constants");
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

router.get(
  "/test",
  guard,
  role(Gender.MALE),
  wrapError((req, res, next) => {
    res.json({
      status: "success",
      code: 200,
      data: { message: "Only for man" },
    });
  })
);

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
