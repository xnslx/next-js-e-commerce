import React, { useState, useEffect } from "react";
import { sanityClient } from "../utils/sanity";

const Tags = ({ summer, autumn, pants, top, newly }) => {
  return (
    <div className="mt-12 flex flex-row overflow-auto">
      <button
        className="border font-mono p-2 text-xs border-black focus:bg-lime-300"
        onClick={summer}
      >
        Colorful Summer
      </button>
      <button
        className="ml-4 border font-mono p-2 text-xs border-black focus:bg-lime-300"
        onClick={autumn}
      >
        Autumn
      </button>
      <button
        className="ml-4 border font-mono p-2 text-xs border-black focus:bg-lime-300"
        onClick={pants}
      >
        Pants
      </button>
      <button
        className="ml-4 border font-mono p-2 text-xs border-black focus:bg-lime-300"
        onClick={top}
      >
        Tops
      </button>
      <button
        className="ml-4 border font-mono p-2 text-xs border-black focus:bg-lime-300"
        onClick={newly}
      >
        Newly Arrival
      </button>
    </div>
  );
};

export default Tags;
