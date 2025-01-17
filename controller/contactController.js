const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
// Get all contacts
// route -> GET/api/contacts
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find()
    res.status(200).json(contacts)
})

// create contacts
// route -> POST/api/contacts
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { name, age, phone } = req.body
    if (!name || !age || !phone) {
        throw new Error("All fields are required")
        res.status(400)
    }
    const contact = await Contact.create({
        name,
        age,
        phone,
    })
    res.status(200).json(contact)
})

// GET contacts by id
// route -> GET/api/contacts/:id
const getContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

// Update contacts
// route -> PUT/api/contacts/:id
const UpdateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
})

// Delete contacts
// route -> DELETE/api/contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json(contact)
})

module.exports = { getContact, createContact, getContacts, UpdateContact, deleteContact }