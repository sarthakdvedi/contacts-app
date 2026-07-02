const express = require('express');
const router = express.Router();
const {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contactControllers');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken); // this will apply the validateToken middleware to all routes in this router, so we don't have to add it to each route separately
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;