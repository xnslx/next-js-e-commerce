import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import BackIcon from "../components/ui/back";
import Back from "../components/ui/back";
import Link from "next/link";
import FavoriteIcon from "../components/ui/favorite";
import { toggleFavList } from "../action/action";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/client";
import EmptyState from "../components/ui/emptystate";

const SearchResult = ({ products }) => {
  const [haveData, setHaveData] = useState(false);
  const dispatch = useDispatch();
  const [session, loading] = useSession();
  const router = useRouter();

  if (products !== null) {
    setHaveData(true);
  }

  const toggleFavHandler = (e, prodId) => {
    if (!session) {
      router.push("/login");
    } else {
      dispatch(toggleFavList(prodId));
    }
  };
  return (
    <>
      {haveData ? (
        <div>
          <Link href="/">
            <a>
              <BackIcon />
            </a>
          </Link>
          <div className="grid grid-cols-2 w-10/12 gap-2 ml-auto mr-auto mt-8 lg:grid-cols-3 xl:grid-cols-4 mt-6 lg:gap-8">
            {products.map((product, index) => (
              <ul key={index}>
                <Image
                  src={product.image}
                  width={350}
                  height={480}
                  className="object-cover"
                />
                <button
                  onClick={(e) => toggleFavHandler(e, product.prodId)}
                  className="mt-2"
                >
                  <FavoriteIcon />
                </button>
                <li className="text-lg leading-7 font-bold">{product.name}</li>
                <li className="text-sm leading-7 font-semibold">
                  {product.size}
                </li>
              </ul>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  console.log("context", context);
  const { query } = context;
  console.log("query", query);
  let result = Object.entries(query)
    .map(([key, value]) => {
      if (key === "gender") {
        return "gender=" + query[key];
      } else if (key === "size") {
        return "size=" + query[key];
      } else {
        return "category=" + query[key];
      }
    })
    .join("&");

  console.log("result", result);

  const response = await fetch(
    "http://localhost:3000/api/filterresult?" + result,
    {
      method: "POST",
      "Content-Type": "application/json",
    }
  );

  const data = await response.json();
  console.log("data", data);

  return {
    props: {
      products: data.products || null,
    },
  };
}

export default SearchResult;
