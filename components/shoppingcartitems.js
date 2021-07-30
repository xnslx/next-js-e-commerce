import React from "react";
import Image from "next/image";

const ShoppingCartItems = ({ items }) => {
  console.log("items", items);
  return (
    <div>
      {items.map((i, index) => (
        <ul key={index} className="flex flex-row mb-6">
          <Image src={i.foundItem.image} width={90} height={120} />
          <div className="ml-4 mt-2">
            <li>
              <strong className="pr-2">Name:</strong>
              {i.foundItem.name}
            </li>
            <li>
              <strong className="pr-2">Size:</strong>
              {i.foundItem.size}
            </li>
            <li>
              <strong className="pr-2">Price:</strong>
              {i.foundItem.price}
            </li>
            <li>
              <strong className="pr-2">Quantity:</strong>
              {i.quantity}
            </li>
          </div>
        </ul>
      ))}
    </div>
  );
};

export default ShoppingCartItems;
