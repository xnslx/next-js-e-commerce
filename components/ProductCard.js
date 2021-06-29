import Link from "next/link";
import { urlFor } from "../utils/sanity";
import { getSession, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import FavoriteIcon from "../components/ui/favorite";
import axios from "axios";

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
      axios
        .post("http://localhost:3000/api/favoritelist", {
          prodId: prodId,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
