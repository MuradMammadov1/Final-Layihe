const express = require('express');
const router = express.Router();
const { sendContactMessage, getContacts, updateContactStatus, deleteContact } = require('../controllers/contactController');

router.post('/', sendContactMessage);
router.get('/', getContacts);
router.put('/:id/status', updateContactStatus);
router.delete('/:id', deleteContact);

module.exports = router;
