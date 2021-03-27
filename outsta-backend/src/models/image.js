const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        required: true,
    },
    url: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Image", ImageSchema);