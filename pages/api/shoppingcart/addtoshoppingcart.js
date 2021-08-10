import Products from "../../../models/Products";
import User from "../../../models/User";
import { connectToDatabase } from "../../../utils/db";
import arrayUnique from "../../../utils/helper";
import { getSession } from "next-auth/client";
import mongoose from "mongoose";

export default async(req, res) => {
    switch (req.method) {
        case "POST":
            await toggleShoppingCart(req, res);
            break;
        case "GET":
            await getShoppingCart(req, res);
            break;
    }
};

const toggleShoppingCart = async(req, res) => {
    const session = await getSession({ req });
    const prodId = req.body.prodId;
    const total = req.body.quantity;
    const variantId = req.body.variantId;
    if (session) {
        try {
            const client = connectToDatabase();
            const user = await User.findOne({ email: session.user.email });
            const product = await Products.findOne({ prodId: prodId });
            const shoppingcart = user.shoppingCart.items;
            const checkNewlyAddedItemIndex = shoppingcart
                .map((item) => item.prodId)
                .indexOf(prodId);
            console.log("checkNewlyAddedItemIndex", checkNewlyAddedItemIndex);
            // the item has already in the shopping cart, just update the quantity
            if (checkNewlyAddedItemIndex >= 0) {
                // find the item that need to update the quantity
                const targetItem = shoppingcart.find((i) => {
                    if (i.prodId === prodId) {
                        return i;
                    }
                });
                targetItem.quantity = total;
                targetItem.shopifyId = variantId;
                user.shoppingCart = shoppingcart;
                user.save();
                res.status(201).json({
                    message: "Add product to shopping cart",
                    shoppingCart: shoppingcart,
                });
            } else if (checkNewlyAddedItemIndex < 0) {
                // no item found in the shopping cart, add item with quantity to the shopping cart
                const userShoppingCart = user.shoppingCart.items;
                const updatedList = await userShoppingCart.concat({
                    prodId: prodId,
                    quantity: total,
                    shopifyId: variantId,
                });
                const updatedCart = {
                    items: updatedList,
                };
                user.shoppingCart = updatedCart;
                user.save();
                res.status(201).json({
                    message: "Add product to shopping cart",
                    shoppingCart: updatedCart,
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
    if (!session) {
        res.send("You need to log in first");
    }
};

const addToShoppingCart = async(req, res) => {
    const session = await getSession({ req });
    const prodId = req.body.prodId;
    const total = req.body.quantity;
    console.log("total", total);
    if (session) {
        try {
            const client = connectToDatabase();
            const user = await User.findOne({ email: session.user.email });
            const product = await Products.findOne({ prodId: prodId });
            console.log(user);
            console.log("toggle", product);
            const shoppingcart = user.shoppingCart.items;
            const itemIndex = shoppingcart.map((item) => item.prodId).indexOf(prodId);
            console.log("shoppingcart", shoppingcart);
            console.log("itemIndex", itemIndex);
            // the item has already in the shopping cart, just update the quantity
            if (itemIndex >= 0) {
                return;
            } else if (itemIndex < 0) {
                // no item found in the shopping cart, add item to the shopping cart
                const result = await user.addToShoppingCart(product, total);
                console.log("result", result);
                res.status(201).json({
                    message: "Add product to shopping cart",
                    shoppingCart: result.shoppingCart.items,
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
    if (!session) {
        res.send("You need to log in first");
    }
};

const getShoppingCart = async(req, res) => {
    const session = await getSession({ req });
    console.log("getShoppingCart", session);
    if (session) {
        try {
            const user = await User.findOne({ email: session.user.email });
            const shoppingcart = user.shoppingCart.items;
            console.log("shoppingcart", shoppingcart);

            if (shoppingcart) {
                const detailedproducts = await User.aggregate([{
                    $lookup: {
                        from: "products",
                        let: {
                            shoppingCart: "$shoppingCart.items.prodId",
                        },
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [{
                                        $in: ["$prodId", "$$shoppingCart"],
                                    }, ],
                                },
                            },
                        }, ],
                        as: "userShoppingCartItems",
                    },
                }, ]);
                const targetUser = await detailedproducts.find((i) => {
                    if (i.email === session.user.email) {
                        return i;
                    }
                });

                // user.save();
                // const test = await arrayUnique(
                //     shoppingcart,
                //     targetUser.userShoppingCartItems
                // );
                // console.log("test", test);
                res.status(200).json({
                    message: "This is your shopping cart",
                    shoppingCart: targetUser.userShoppingCartItems,
                    items: shoppingcart,
                });
            } else {
                res.status(200).json({ message: "shopping cart is empty." });
            }
        } catch (err) {
            console.log(err);
        }
    }
    if (!session) {
        res.send("You need to log in first");
    }
};