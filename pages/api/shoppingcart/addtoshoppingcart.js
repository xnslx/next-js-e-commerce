import Products from "../../../models/Products";
import User from "../../../models/User";
import { connectToDatabase } from "../../../utils/db";
import { getSession } from "next-auth/client";

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
    console.log("total", total);
    if (session) {
        try {
            const client = connectToDatabase();
            const user = await User.findOne({ email: session.user.email });
            console.log("user", user);
            const product = await Products.findOne({ prodId: prodId });
            console.log("product", product);
            const shoppingcart = user.shoppingCart.items;
            console.log("shoppingcart", shoppingcart);
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
                console.log("targetItem", targetItem);
                targetItem.quantity = total;
                // const list = shoppingcart.splice(
                //     checkNewlyAddedItemIndex,
                //     1,
                //     targetItem
                // );
                // console.log("list", list);
                // shoppingcart[checkNewlyAddedItemIndex] = list;
                user.shoppingCart = shoppingcart;
                console.log("shoppingcart", shoppingcart);
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
                });
                console.log("prodId", prodId);
                console.log("updatedList", updatedList);
                const updatedCart = {
                    items: updatedList,
                };
                user.shoppingCart = updatedCart;
                user.save();
                res.status(201).json({
                    message: "Add product to shopping cart",
                    shoppingCart: user.shoppingCart.items,
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
            console.log("getShoppingCart", user);
            const shoppingcart = user.shoppingCart.items;
            console.log("shoppingcart", shoppingcart);
            const detailedproducts = await user
                .populate("shoppingCart.items.productId")
                .execPopulate();
            console.log("detailedproducts", detailedproducts.shoppingCart.items);
            res
                .status(200)
                .json({ shoppingCart: detailedproducts.shoppingCart.items });
        } catch (err) {
            console.log(err);
        }
    }
    if (!session) {
        res.send("You need to log in first");
    }
};