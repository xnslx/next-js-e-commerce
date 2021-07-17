import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

import EmptyState from "../components/ui/emptystate";

const Shoppingcart = () => {
  const [haveProducts, setHaveProducts] = useState(false);
  const shoppingCartList = useSelector(
    (state) => state.shoppingCart.shoppingCart
  );

  useEffect(() => {
    if (shoppingCartList == null) {
      setHaveProducts(false);
    } else {
      setHaveProducts(true);
    }
  }, []);

  console.log("shoppingcart", shoppingCartList);
  return (
    <div>
      <h3 className="text-gray-700 text-center text-5xl font-semibold mb-8">
        Shopping Cart
      </h3>
      {haveProducts ? (
        <div>
          {shoppingCartList.map((i, index) => (
            <ul key={index}>
              <Image src={i.image} height={90} width={100} />
              <li>Name:{i.name}</li>
              <li>Price: ${i.price}</li>
              <li>Size: {i.size}</li>
            </ul>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Shoppingcart;
