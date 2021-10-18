const express = require('express')
const router = express.Router()
const {
  validateUser,
  validateUserPatch,
  validateUserId,
} = require("./validation");

const {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
} = require("../../controllers/contacts");

router.get("/", getContacts);

router.get('/:contactId',validateUserId, getContact)

router.post('/',validateUser, addContact)

router.delete('/:contactId',validateUserId, deleteContact)

router.put("/:contactId", validateUserId, validateUser, updateContact);

router.patch('/:contactId/favorite/',validateUserId, validateUserPatch, updateContact)

module.exports = router
