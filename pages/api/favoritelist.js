import Products from "../../models/Products";
import User from "../../models/User";
import { connectToDatabase } from "../../utils/db";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await toggleFavoriteList(req, res);
      break;
    case "GET":
      await getFavoriteList(req, res);
      break;
  }
};

const toggleFavoriteList = async (req, res) => {
  const session = await getSession({ req });
  const prodId = req.body.prodId;
  if (session) {
    try {
      const client = connectToDatabase();
      const user = await User.findOne({ email: session.user.email });
      const product = await Products.findOne({ prodId: prodId });
      const favList = user.favoriteList.items;
      const itemIndex = favList.map((item) => item.prodId).indexOf(prodId);
      if (itemIndex >= 0) {
        const result = await user.removeProductFromFavList(product);
        res.status(201).json({
          message: "Remove product from favorite list",
          favList: result.favoriteList.items,
        });
      } else if (itemIndex < 0) {
        const result = await user.addToFavoritesList(product);
        res.status(201).json({
          message: "Add product to favorite list",
          favList: result.favoriteList.items,
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

const getFavoriteList = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    try {
      const user = await User.findOne({ email: session.user.email });
      const favoriteList = user.favoriteList.items;

      const detailedproducts = await User.aggregate([
        {
          $lookup: {
            from: "products",
            let: {
              favoriteList: "$favoriteList.items.prodId",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $in: ["$prodId", "$$favoriteList"],
                      },
                    ],
                  },
                },
              },
            ],
            as: "userFavoriteListItems",
          },
        },
      ]);
      const targetUser = await detailedproducts.find((i) => {
        if (i.email === session.user.email) {
          return i;
        }
      });
      res.status(200).json({ favoriteList: targetUser.userFavoriteListItems });
    } catch (err) {
      console.log(err);
    }
  }
  if (!session) {
    res.send("You need to log in first");
  }
};
