import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/client";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavList } from "../action/action";

import LikedIcon from "../components/ui/liked";
import FavoriteIcon from "../components/ui/favorite";

const ShoppingCartItems = ({ items }) => {
  const dispatch = useDispatch();
  const [session, loading] = useSession();
  const [favProduct, setFavProduct] = useState();
  const [like, setLike] = useState(false);

  const favList = useSelector((state) => state.favoriteList.favoriteList);
  const shoppingCart = useSelector((state) => state.shoppingCart.shoppingCart);

  return (
    <div className="grid grid-cols-2  gap-2 ml-auto mr-auto mt-8 lg:grid-cols-3 xl:grid-cols-4 mt-6 mb-24 lg:gap-8 border lg:w-9/12 ">
      {items &&
        items.map((i, index) => (
          <div
            key={index}
            className="w-full max-w-sm mx-auto overflow-hidden border border-black"
          >
            <div className="h-40 lg:h-72">
              <Image
                src={i.variant.image.src}
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
            <div className="pl-2 pb-6">
              <p>{i.title}</p>
              <p>${i.variant.price}</p>
              <p>Quantity: {i.quantity}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShoppingCartItems;
