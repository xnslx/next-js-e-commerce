import { useState } from "react";

import ProductCard from "./ProductCard";

function ProductsPage({ products }) {
  return (
    <div className="container mx-auto px-6">
      <h3 className="text-gray-700 text-2xl font-medium">Clothes</h3>
      {/* <span className="mt-3 text-sm text-gray-500">The Juicy bits.</span> */}
      <div className="grid grid-cols-2 w-full gap-2 ml-auto mr-auto mt-8 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
