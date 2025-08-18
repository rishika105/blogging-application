const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    body: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("Comments", commentSchema)



