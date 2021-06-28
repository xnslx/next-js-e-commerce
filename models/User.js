const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    resetToken: String,
    resetTokenExpiration: Date,
    favoriteList: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Products",
                required: true,
            },
        }, ],
    },
    shoppingCart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Products",
                required: true,
            },
            quantity: { type: Number, required: true },
        }, ],
    },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);