import Link from "next/link";
import { urlFor } from "../utils/sanity";
import { getSession, signIn, useSession } from "next-auth/client";

function ProductCard({ _id, title, mainImage, slug, defaultProductVariant }) {
  const [session, loading] = useSession();

  const cartHandler = (e) => {
    console.log("click");
    e.preventDefault();
    if (session) {
      console.log("you have a session");
    } else {
      console.log("you are not in the session");
    }
  };

  return (
    <Link href={`/products/${slug.current}`}>
      <a className="w-full max-w-sm mx-auto rounded-md shadow-sm overflow-hidden">
        <div className="h-80 w-full justify-end object-contain">
          <img src={urlFor(mainImage)} alt="" />
          <button
            onClick={cartHandler}
            className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-3">
          <h3 className="text-gray-700 uppercase">{title}</h3>
          <span className="text-gray-500 mt-2">
            ${defaultProductVariant?.price}
          </span>
        </div>
      </a>
    </Link>
  );
}

export default ProductCard;
