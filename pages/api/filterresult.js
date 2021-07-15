import Products from "../../models/Products";
import { connectToDatabase } from "../../utils/db";

const client = connectToDatabase();
console.log("client", client);

export default async function getProductsByFilterResult(req, res) {
  console.log("req.query", req.query);
  let query = {};
  const { gender, size, category } = req.query;
  if (req.method !== "POST") {
    return;
  }
  let payload = { category: category, size: size, gender: gender };
  if (payload.category && payload.category.length > 0)
    query.category = { $in: payload.category };
  if (payload.size && payload.size.length > 0)
    query.size = { $in: payload.size };
  if (payload.gender && payload.gender.length > 0)
    query.gender = { $in: payload.gender };

  const filtered = await Products.find({ prodId: { $exists: true } }).find(
    query
  );
  //   const result = await Products.find(query);
  console.log("filtered", filtered);
  if (filtered == "") {
    res
      .status(201)
      .json({
        prodcuts: filtered,
        message: "Can not find the product that you are looking for.",
      });
    return;
  }
  res.status(201).json({ products: filtered });
}
