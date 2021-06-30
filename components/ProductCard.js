import React, { useEffect } from "react";
import Link from "next/link";
import { urlFor } from "../utils/sanity";
import { getSession, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import FavoriteIcon from "../components/ui/favorite";
import axios from "axios";
import sanityClient from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
};

const client = sanityClient(config);

function ProductCard({
  _id,
  title,
  size,
  mainImage,
  slug,
  defaultProductVariant,
}) {
  const [session, loading] = useSession();
  const router = useRouter();

  const toggleFavHandler = (e, prodId) => {
    console.log(prodId);
    if (!session) {
      router.push("/login");
    } else {
      // axios
      //   .post("http://localhost:3000/api/favoritelist", {
      //     prodId: prodId,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // const mutations = [
      //   {
      //     createOrReplace: {
      //       _id: "my-list",
      //       _type: "object",
      //       title: "Wishing List",
      //       list: prodId,
      //     },
      //   },
      // ];
      // fetch(
      //   `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-30/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      //   {
      //     method: "post",
      //     headers: {
      //       "Content-type": "application/json",
      //       Authorization: `Bearer skRl8fcTVkKDM75SmsMSJ1iq5kKaCZARHgIzZiEjWgjEppgjRMhHeCehff28O5wUIo1TXcUU2dZccvhfQ`,
      //     },
      //     body: JSON.stringify({ mutations }),
      //   }
      // )
      //   .then((response) => response.json())
      //   .then((result) => console.log(result))
      //   .catch((error) => console.error(error));
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto rounded-md overflow-hidden">
      <div className="h-60 w-full justify-end object-contain">
        <a href={`/products/${slug.current}`}>
          <img src={urlFor(mainImage)} alt="" />
        </a>
        <button onClick={(e) => toggleFavHandler(e, _id)} className="">
          <FavoriteIcon />
        </button>
      </div>
      <div className="mb-4 lg:mt-48">
        <h3 className="text-lg font-bold uppercase">{title}</h3>
        <div className="flex flex-col">
          <span className="text-lg leading-7">
            ${defaultProductVariant?.price}
          </span>
          <span className="text-lg leading-7">
            {defaultProductVariant?.size}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
