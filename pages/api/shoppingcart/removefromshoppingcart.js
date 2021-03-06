import Products from "../../../models/Products";
import User from "../../../models/User";
import { connectToDatabase } from "../../../utils/db";
import { getSession } from "next-auth/client";

export default async(req, res) => {
    switch (req.method) {
        case "POST":
            await removeFromShoppingCart(req, res);
            break;
    }
};

const removeFromShoppingCart = async(req, res) => {
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
            if (itemIndex >= 0) {
                const result = await user.removeProductFromShoppingCart(product);
                res.status(201).json({
                    message: "Remove product from shopping cart",
                    shoppingCart: result.shoppingCart.items,
                });
            } else if (itemIndex < 0) {
                return;
            }
        } catch (err) {
            console.log(err);
        }
    }
    if (!session) {
        res.send("You need to log in first");
    }
};