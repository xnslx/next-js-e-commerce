import { useState } from "react";
import Error from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  getClient,
  usePreviewSubscription,
  sanityClient,
} from "../utils/sanity";
import ProductsPage from "../components/ProductsPage";

import PopOver from "../components/ui/popover";
import SortFilter from "../components/sortandfilter/sortfilter";

import SearchResult from "../components/searchresult";

const query = `//groq
  *[_type == "product" && defined(slug.current)]
`;

function IndexPage(props) {
  // console.log("indexjs", props);
  const [open, setOpen] = useState(false);
  const [listProducts, setListProducts] = useState(products);
  const [haveResult, setHaveResult] = useState(false);

  const clickHandler = (e) => {
    e.preventDefault();
    setOpen((prevState) => ({
      open: !prevState.open,
    }));
  };

  const callbackHandler = (result) => {
    // console.log("indexjs", result);
    setListProducts(result);
    setHaveResult(true);
  };

  const { productsData, targetProducts, preview } = props;
  const router = useRouter();

  if (!router.isFallback && !productsData) {
    return <Error statusCode={404} />;
  }
  const { data: products } = usePreviewSubscription(query, {
    initialData: targetProducts,
    enabled: preview || router.query.preview !== null,
  });

  // console.log("indexjs", products);

  return (
    <div className="my-8 bg-primary">
      <Head>
        <title>Nextjs TailwindCSS Sanityio EcommerceWebsite</title>
        <meta
          name="description"
          content="a website to sell gently used kids' clothing"
        />
      </Head>
      <div className="mt-4">
        <ProductsPage products={products} />
      </div>
    </div>
  );
}

export async function getStaticProps({ params = {}, preview = false }) {
  const productsData = await getClient(preview).fetch(query);
  const shopifyProducts = await sanityClient.fetch(
    `*[_type == "shopifyProduct"]`
  );
  const targetProducts = await sanityClient.fetch(`
    *[_type == 'product']{
      ...,
      'shopifyproduct': shopifyproduct[] ->
    }
  `);
  // console.log("productsData", productsData);
  // console.log("shopifyProducts", shopifyProducts);
  // console.log("targetProducts", targetProducts);
  return {
    props: {
      preview,
      productsData,
      shopifyProducts,
      targetProducts,
    },
  };
}

export default IndexPage;
