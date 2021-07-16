import { useState } from "react";

import ProductCard from "./ProductCard";

import PopOver from "./ui/popover";
import SortFilter from "./sortandfilter/sortfilter";

import { sanityClient } from "../utils/sanity";

import Tags from "./tags";

function ProductsPage({ products }) {
  console.log("productspage", products);
  const summerTagSelectionHandler = () => {
    sanityClient
      .fetch(`*[_type == "product" && "summer" in tags]`)
      .then((data) => {
        console.log(data);
        setHaveItems(true);
        setSelectedProducts(data);
      });
  };

  const autumnTagSelectionHandler = () => {
    sanityClient
      .fetch(`*[_type == "product" && "fall" in tags]`)
      .then((data) => {
        console.log(data);
        setHaveItems(true);
        setSelectedProducts(data);
      });
  };

  const pantsTagSelectionHandler = () => {
    sanityClient
      .fetch(`*[_type == "product" && "pants" in tags]`)
      .then((data) => {
        console.log(data);
        setHaveItems(true);
        setSelectedProducts(data);
      });
  };

  const topTagSelectionHandler = () => {
    sanityClient
      .fetch(`*[_type == "product" && "top" in tags]`)
      .then((data) => {
        console.log(data);
        setHaveItems(true);
        setSelectedProducts(data);
      });
  };

  const newlyTagSelectionHandler = () => {
    sanityClient
      .fetch(`*[_type == "product" && "newly" in tags]`)
      .then((data) => {
        console.log(data);
        setHaveItems(true);
        setSelectedProducts(data);
      });
  };
  const [open, setOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [haveItems, setHaveItems] = useState(false);

  const clickHandler = (e) => {
    e.preventDefault();
    setOpen((prevState) => ({
      open: !prevState.open,
    }));
  };
  return (
    <div className="container mx-auto px-6">
      <h3 className="text-gray-700 text-5xl font-bold mb-8">Clothes</h3>
      {open ? <PopOver /> : null}
      <a onClick={clickHandler}>
        <SortFilter />
      </a>
      <Tags
        summer={summerTagSelectionHandler}
        autumn={autumnTagSelectionHandler}
        pants={pantsTagSelectionHandler}
        top={topTagSelectionHandler}
        newly={newlyTagSelectionHandler}
      />
      <div>
        {haveItems ? (
          <div className="grid grid-cols-2 w-full gap-2 ml-auto mr-auto mt-8 lg:grid-cols-3 xl:grid-cols-4 mt-6 lg:gap-8">
            {selectedProducts.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 w-full gap-2 ml-auto mr-auto mt-8 lg:grid-cols-3 xl:grid-cols-4 mt-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
