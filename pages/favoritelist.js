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
    // dispatch(getProductFavList());
    setFavItems(favoriteList.items);
  };

  return (
    <div>
      <h3 className="text-gray-700 text-center text-5xl font-semibold mb-8">
        Favorite List
      </h3>
      {haveProducts && favItems ? (
        <div className=" w-10/12 gap-2 ml-auto mr-auto mt-12 lg:grid-cols-3 xl:grid-cols-4 mt-6 lg:gap-8">
          {favItems.map((i, index) => (
            <ul key={index} className="flex flex-row mb-6">
              <Image src={i.image} height={90} width={100} />
              <div className="ml-6">
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
                  <button onClick={(e) => deleteHandler(e, i.prodId)}>
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
