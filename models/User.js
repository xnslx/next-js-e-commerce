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
            prodId: {
                type: String,
                ref: "Products",
                required: true,
            },
        }, ],
    },
    shoppingCart: {
        items: [{
            prodId: {
                type: String,
                ref: "Products",
                required: true,
            },
            shopifyId: {
                type: String,
                ref: "Products",
                required: true,
            },
            quantity: { type: Number, required: true },
        }, ],
    },
});

userSchema.methods.addToFavoritesList = function(product) {
    console.log("product", product);
    const updatedFavListItems = [...this.favoriteList.items];
    console.log("updatedFavListItems", updatedFavListItems);
    updatedFavListItems.push({ prodId: product.prodId });
    const updatedList = {
        items: updatedFavListItems,
    };
    console.log("updatedList", updatedList);
    this.favoriteList = updatedList;
    return this.save();
};

userSchema.methods.removeProductFromFavList = function(product) {
    console.log("removeProductFromFavList", product);
    const needToBeRemovedProductIndex = this.favoriteList.items.findIndex(
        (prod) => {
            return prod.prodId === product.prodId;
        }
    );
    const removedProductItem = this.favoriteList.items.splice(
        needToBeRemovedProductIndex,
        1
    );
    console.log("removedProductItem", removedProductItem);
    this.favoriteList = this.favoriteList;
    return this.save();
};

userSchema.methods.addToShoppingCart = function(product, total) {
    console.log("addToShoppingCart", product);
    console.log("addToShoppingCart", total);
    console.log("this.shoppingCart", this.shoppingCart);
    const newlyUpdatedQuantity = total;
    const newlyAddedToCartItemIndex = this.shoppingCart.items.findIndex(
        (prod) => {
            return prod.prodId === product.prodId;
        }
    );
    let newQuantity = 1;
    const updatedCartItems = [...this.shoppingCart.items];
    if (newlyAddedToCartItemIndex >= 0) {
        newQuantity =
            this.shoppingCart.items[newlyAddedToCartItemIndex].newlyUpdatedQuantity +
            1;
        updatedCartItems[
            newlyAddedToCartItemIndex
        ].newlyUpdatedQuantity = newQuantity;
    } else {
        updatedCartItems.push({ prodId: product.prodId, quantity: newQuantity });
    }
    const updatedCart = {
        items: updatedCartItems,
    };
    this.shoppingCart = updatedCart;
    return this.save();
};

userSchema.methods.removeProductFromShoppingCart = function(product) {
    const needToBeRemovedProductIndex = this.shoppingCart.items.findIndex(
        (prod) => {
            return prod.prodId === product.prodId;
        }
    );
    const removedProductItem = this.shoppingCart.items.splice(
        needToBeRemovedProductIndex,
        1
    );
    this.shoppingCart = this.shoppingCart;
    return this.save();
};

userSchema.methods.clearCart = function() {
    this.shoppingCart = { items: [] };
    return this.save();
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);