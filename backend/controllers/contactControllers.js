const asyncHandler = require('express-async-handler'); //so we don't have to write try catch block in every controller function
// it auto tries and catches 
const Contact = require('../models/contactModel');

// @desc READ all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

// @desc READ contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to get other user's contact");
    }

    res.status(200).json(contact);
});

// @desc CREATE contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error('All fields are mandatory!');
        //Because you throw an Error, the function execution halts immediately and 
        // jumps to your Express error-handling middleware.
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    }) // as in es6 if the key and value are same, we can write it like this, instead of name: name, email: email, phone: phone
    res.status(201).json(contact);
    // console.log('Contact created: ', req.body);
});

// @desc UPDATE contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user's contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, //isse
        req.body, // isme update kardo
        {new: true} // this will return the updated document instead of the old one
    );
    res.status(200).json(updatedContact);
});

// @desc DELETE contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete other user's contact");
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}