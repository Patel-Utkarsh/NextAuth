import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },

    createdAt : {
        type : String,
        rrequired : true,
    }


})

const todoSchema = mongoose.models.todos ||  mongoose.model("todos",schema);
export default todoSchema