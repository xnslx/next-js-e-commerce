import { useState, useRef } from "react";
import { urlFor, PortableText, getClient } from "../utils/sanity";
import FavoriteIcon from "./ui/favorite";
import { useDispatch } from "react-redux";
import { toggleFavList } from "../action/action";
import { addShoppingCart, removeShoppingCart } from "../action/action";
import { getSession, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function ProductPage(props) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const handleCount = (value) =>
    !(count === 0 && value === -1) ? setCount(count + value) : count;

  const { id, title, defaultProductVariant, mainImage, body } = props;

  const [session, loading] = useSession();
  const router = useRouter();

  const shoppingCartList = useSelector(
    (state) => state.shoppingCart.shoppingCart
  );

  const toggleFavListHandler = (e, prodId) => {
    console.log("prodId", prodId);
    if (!session) {
      router.push("/login");
    } else {
      dispatch(toggleFavList(prodId));
    }
  };

  const addToCartHandler = (e, prodId, count) => {
    console.log(count);
    console.log("prodId", prodId);
    if (!session) {
      router.push("/login");
    } else {
      dispatch(addShoppingCart(prodId, count));
      console.log("hello");
    }
  };

  const removeFromCartHandler = (e, prodId, count) => {
    console.log(count);
    console.log("prodId", prodId);
    if (!session) {
      router.push("/login");
    } else {
      dispatch(removeShoppingCart(prodId, count));
      console.log("hello");
    }
  };

  return (
    <div className="container mx-auto px-6">
      <div className="md:flex md:items-center">
        <div className="w-full h-64 md:w-1/2 lg:h-96 ">
          <img
            className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
            src={urlFor(mainImage)
              .auto("format")
              .width(1051)
              .fit("crop")
              .quality(80)}
            alt={mainImage?.alt || `Photo of ${title}`}
          />
        </div>
        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
          <h3 className="text-2xl leading-7 mb-2 font-bold uppercase">
            {title}
          </h3>
          <span className="text-2xl leading-7 font-bold mt-3">
            ${defaultProductVariant?.price}
          </span>
          <hr className="my-3" />
          <div className="mt-2">
            <label className="text-gray-700 text-sm" htmlFor="count">
              Count:
            </label>
            <div className="flex items-center mt-1">
              <button
                onClick={() => handleCount(1)}
                className="text-gray-500 focus:outline-none focus:text-gray-600"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <span className="text-gray-700 text-lg mx-2">{count}</span>
              <button
                onClick={() => handleCount(-1)}
                className="text-gray-500 focus:outline-none focus:text-gray-600"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-12 flex flex-row justify-between ">
            {/* <button
              className="border p-2 mb-8 border-black shadow-offset-lime w-2/3 font-bold"
              onClick={(e) => toggleShoppingCartHandler(e, id)}
            >
              Add to Shopping Cart
            </button> */}
            {shoppingCartList.includes(id) ? (
              <button
                className="border p-2 mb-8 border-black shadow-offset-lime w-2/3 font-bold"
                onClick={(e) => removeFromCartHandler(e, id)}
              >
                Remove product from shopping cart
              </button>
            ) : (
              <button
                className="border p-2 mb-8 border-black shadow-offset-lime w-2/3 font-bold"
                onClick={(e) => addToCartHandler(e, id)}
              >
                Add to cart
              </button>
            )}
            <button
              className="-mt-8"
              onClick={(e) => toggleFavListHandler(e, id)}
            >
              <FavoriteIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16 md:w-2/3">
        <h3 className="text-gray-600 text-2xl font-medium">Description</h3>
        {body && <PortableText blocks={body?.en} className="text-gray-600" />}
      </div>
    </div>
  );
}

export default ProductPage;
