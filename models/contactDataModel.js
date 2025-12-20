const mongoose = require("mongoose")

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type:mongoose.Schema.Types.ObjectId,
            required:[true],
            ref:"user"
        },
        name : {
            type:String,
            required:[true,"Please Give the Name"],
        },
        contactNo : {
            type:String,
            required:[true,"Please Give the Conatct Number"],
        },
        email : {
            type:String,
            required:[true,"Please Give the email ID"],
        },

    },
    {
        timestamps:true,
    }
)

module.exports = mongoose.model("ContactSchema",contactSchema)