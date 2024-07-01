import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
    },

    password : {
        type : String,
        required : true,
    },

    todosData : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "todos"
        }
    ]

})

const userSchema = mongoose.models.User || mongoose.model('User', schema);

export default userSchema