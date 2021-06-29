import Link from "next/link";
import { urlFor } from "../utils/sanity";
import { getSession, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import FavoriteIcon from "../components/ui/favorite";

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

  const cartHandler = (e) => {
    console.log("click");
    e.preventDefault();
    if (session) {
      console.log("you have a session");
    } else {
      router.push("/login");
    }
  };

  return (
    <Link href={`/products/${slug.current}`}>
      <a className="w-full max-w-sm mx-auto rounded-md overflow-hidden">
        <div className="h-60 w-full justify-end object-contain">
          <img src={urlFor(mainImage)} alt="" />
          <button onClick={cartHandler}>
            <FavoriteIcon />
          </button>
        </div>
        <div className="mb-4">
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
      </a>
    </Link>
  );
}

export default ProductCard;
