const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add a Contact name"]
    },
    age:{
        type:String,
        required:[true,"Please add age"]
    },
    phone:{
        type:Number,
        required :[true,"Please add phone number"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Contact",contactSchema) 