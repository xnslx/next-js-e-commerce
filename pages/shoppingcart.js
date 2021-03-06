import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import arrayUnique from "../utils/helper";

import EmptyState from "../components/ui/emptystate";
import ShoppingCartItems from "../components/shoppingcartitems";
import Router from "next/router";
import { getCart } from "../utils/shopify";
import { get } from "js-cookie";

const Shoppingcart = () => {
  const [haveProducts, setHaveProducts] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCart().then((res) => {
      if (res !== undefined) {
        setHaveProducts(true);
        setCartItems(res.lineItems);
      } else {
        setHaveProducts(false);
      }
    });
  }, []);
  return (
    <>
      <div>
        <h3 className="text-gray-700 text-center text-5xl font-semibold mb-8">
          Shopping Cart
        </h3>
        {haveProducts ? (
          <div className=" w-10/12 gap-2 ml-auto mr-auto mt-12 lg:grid-cols-3 xl:grid-cols-4 mt-6 lg:gap-8">
            <ShoppingCartItems items={cartItems} />
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
      <button
        className="border-4 fixed bottom-0 font-mono p-2 w-full  bg-lime-300 border-black shadow-offset-black"
        onClick={async () => {
          const { webUrl } = await getCart();
          Router.replace(webUrl);
        }}
      >
        Proceed to Check Out
      </button>
    </>
  );
};

export default Shoppingcart;
