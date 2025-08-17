const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    user: {
        type: String,
        required: true,
    }
})