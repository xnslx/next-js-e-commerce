import { useState, useRef } from "react";
import { urlFor, PortableText, getClient } from "../utils/sanity";
import FavoriteIcon from "./ui/favorite";
import LikedIcon from "./ui/liked";
import AddIcon from "./ui/add";
import MinusIcon from "./ui/minus";
import { useDispatch } from "react-redux";
import { toggleFavList } from "../action/action";
import { addShoppingCart, removeShoppingCart } from "../action/action";
import { addProductToCart } from "../utils/shopify";
import { getSession, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Router from "next/router";

function ProductPage(props) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const handleCount = (value) =>
    !(count === 0 && value === -1) ? setCount(count + value) : count;

  const {
    id,
    title,
    defaultProductVariant,
    mainImage,
    body,
    shopifyproduct,
  } = props;

  const [session, loading] = useSession();
  const router = useRouter();

  const countRef = useRef();

  const shoppingCartList = useSelector(
    (state) => state.shoppingCart.shoppingCart
  );

  const favList = useSelector((state) => state.favoriteList.favoriteList);

  const toggleFavListHandler = (e, prodId) => {
    console.log("prodId", prodId);
    if (!session) {
      router.push("/login");
    } else {
      dispatch(toggleFavList(prodId));
    }
  };

  const addToCartHandler = (e, prodId, count) => {
    const enteredCount = countRef.current.value;
    if (!session) {
      router.push("/login");
    } else {
      dispatch(addShoppingCart(prodId, count));
    }
  };

  const removeFromCartHandler = (e, prodId, count) => {
    const enteredCount = countRef.current.value;
    if (!session) {
      router.push("/login");
    } else {
      dispatch(removeShoppingCart(prodId, count));
    }
  };

  const toggleShoppingCartHandler = (e, prodId) => {
    console.log("prodId", prodId);
    if (!session) {
      router.push("/login");
    } else {
      try {
        if (count < 1) return;
        const variants = shopifyproduct.map((i) => i.variants);
        const [items] = variants;
        const variantIdItem = items.map((i) => i.id);
        const [variantId] = variantIdItem;
        addProductToCart([
          {
            variantId,
            quantity: Number(count),
          },
        ]);
        dispatch(addShoppingCart(count, variantId, prodId));
        // Router.push("/shoppingcart");
      } catch (e) {
        console.log(e);
      }
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
        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2 lg:py-12">
          <h3 className="text-3xl leading-7 mb-2 font-bold uppercase lg:text-5xl">
            {title}
          </h3>
          <span className="text-2xl leading-7 font-bold mt-3">
            ${defaultProductVariant?.price}
          </span>
          <div className="mt-8">
            <label className="text-1xl" htmlFor="count">
              Count:
            </label>
            <div className="flex items-center mt-4">
              <button
                onClick={() => handleCount(1)}
                className="border border-black w-36 h-12 text-gray-500 focus:outline-none focus:text-gray-600"
              >
                <div className="flex justify-center">
                  <AddIcon />
                </div>
              </button>
              <span className="text-2xl mx-2" ref={countRef}>
                {count}
              </span>
              <button
                onClick={() => handleCount(-1)}
                className="border border-black w-36 h-12 text-gray-500 focus:outline-none focus:text-gray-600"
              >
                <div className="flex justify-center">
                  <MinusIcon />
                </div>
              </button>
            </div>
          </div>
          <div className="mt-12 flex flex-row justify-between ">
            <button
              className="border p-2 mb-8 border-black shadow-offset-lime w-2/3 font-bold"
              onClick={(e) => toggleShoppingCartHandler(e, id)}
            >
              Add to Shopping Cart
            </button>
            <button
              className="-mt-8"
              onClick={(e) => toggleFavListHandler(e, id)}
            >
              {session && favList && favList.favIds.includes(id) ? (
                <LikedIcon />
              ) : (
                <FavoriteIcon />
              )}
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
