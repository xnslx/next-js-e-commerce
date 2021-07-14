import React from "react";
import Image from "next/image";

const SearchResult = ({ items }) => {
  console.log("items", items);
  return (
    <div className="grid grid-cols-2 w-11/12 gap-2 ml-auto mr-auto mt-8 lg:grid-cols-3 xl:grid-cols-4 mt-6 lg:gap-8">
      {items.map((i, index) => (
        <ul key={index}>
          <Image src={i.image} width={350} height={350} />
          <li>{i.name}</li>
          <li>{i.size}</li>
        </ul>
      ))}
    </div>
  );
};

export default SearchResult;
