import React, { useState } from "react";
import Image from "next/image";

const ShoppingCartItems = ({ items }) => {
  console.log("items", items);

  // const { lineItems, id, totalPrice } = props.items;
  // console.log(lineItems);
  return (
    <div>
      {items &&
        items.map((i, index) => (
          <div key={index} className="flex flex-row">
            <Image src={i.variant.image.src} width={90} height={120} />
            <div className="pl-4">
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
