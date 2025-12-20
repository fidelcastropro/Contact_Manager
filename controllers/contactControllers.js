//As we are going to integrate the application with the MongoDB, Where we have to work with Promises. Async/ Await makes it more easier to work with Promises
const asyncHandler = require("express-async-handler")
const contactModel = require("../models/contactDataModel")

//Description : Get all the Contacts
//Route : GET contact/
//Access : Private
const getAllContacts = asyncHandler(async (req,res) =>{
    const allContacts = await contactModel.find({user_id : req.user.id})
    res.status(200).json(allContacts);
})

//Description : Get a Particular Contact
//Route : GET contact/:id
//Access : Private
const getOneContact = asyncHandler( async (req,res) => {
    const contact = await contactModel.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact)
})

//Description : Create a new Contact
//Route : POST contact/
//Access : Private
const createContact = asyncHandler(async (req,res) => {
    const {name,contactNo,email} = req.body //here the name of the variables should match with the properties of the Json sent from the client
    if(!name || !contactNo || !email){
       res.status(400)
       throw new Error("All Fields are mandatory");
    }
    else{
        const createContact = await contactModel.create(
            {
                name,
                contactNo,
                email,
                user_id : req.user.id
            }
        )
        res.status(201).json(createContact);
    }    
})

//Description : Update a Contact
//Route : PUT contact/:id
//Access : Private
const updateContact = asyncHandler(async (req,res) => {
    const contact = await contactModel.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("The user is not authorised to update this contact")
    }

    const updatedContact = await contactModel.findByIdAndUpdate(req.params.id,req.body,{new : true})
    res.status(200).json(updatedContact)
})

//Description : Delete a Contact
//Route : DELETE contact/:id
//Access : Private
const deleteContact = asyncHandler(async (req,res) => { 
    const contact = await contactModel.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("The user is not authorised to update this contact")
    }

    await contact.deleteOne()
    res.status(200).json(contact)
})

module.exports = {getAllContacts,getOneContact,createContact,deleteContact,updateContact}