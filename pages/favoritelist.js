import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

import EmptyState from "../components/ui/emptystate";
import DeleteIcon from "../components/ui/delete";
import { getProductFavList, toggleFavList } from "../action/action";

const Favoritelist = () => {
  const [haveProducts, setHaveProducts] = useState(false);
  const [favItems, setFavItems] = useState([]);
  const favoriteList = useSelector((state) => state.favoriteList.favoriteList);
  console.log("favoriteList", favoriteList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (favoriteList.items == null) {
      setHaveProducts(false);
      setFavItems([]);
    } else {
      setHaveProducts(true);
      setFavItems(favoriteList.items);
    }
  }, []);

  console.log("favoriteList ", favoriteList.items);
  console.log("favItems", favItems);

  const deleteHandler = (e, prodId) => {
    dispatch(toggleFavList(prodId));
    dispatch(getProductFavList());
    setFavItems(favoriteList.items);
  };

  return (
    <div>
      <h3 className="text-gray-700 text-center text-5xl font-semibold mb-8">
        Favorite List
      </h3>
      {haveProducts && favoriteList && favoriteList.items ? (
        <div className="grid grid-cols-2 w-11/12 gap-2 ml-auto mr-auto mt-8 lg:grid-cols-3 xl:grid-cols-4 mt-6 lg:gap-8 border lg:w-9/12 ">
          {favoriteList.items.map((i, index) => (
            <ul
              key={index}
              className="w-full max-w-sm mx-auto overflow-hidden border border-black"
            >
              <div className="h-48 lg:h-72">
                <Image
                  src={i.image}
                  height={300}
                  width={300}
                  className="object-cover"
                />
              </div>
              <div className="ml-2 mb-6">
                <li>
                  <strong className="pr-2">Name:</strong>
                  {i.name}
                </li>
                <li>
                  <strong className="pr-2">Price:</strong>${i.price}
                </li>
                <li>
                  <strong className="pr-2">Size:</strong>
                  {i.size}
                </li>
                <li>
                  <button
                    onClick={(e) => deleteHandler(e, i.prodId)}
                    className="mt-4"
                  >
                    <DeleteIcon />
                  </button>
                </li>
              </div>
            </ul>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Favoritelist;
