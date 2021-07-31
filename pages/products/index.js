import Error from "next/error";
import { useRouter } from "next/router";
import {
  getClient,
  usePreviewSubscription,
  sanityClient,
} from "../../utils/sanity";
import ProductsPage from "../../components/ProductsPage";

const query = `//groq
  *[_type == "product" && defined(slug.current)]
`;

function ProductsPageContainer({ productsData, targetProducts, preview }) {
  const router = useRouter();
  if (!router.isFallback && !targetProducts) {
    return <Error statusCode={404} />;
  }
  const { data: products } = usePreviewSubscription(query, {
    initialData: targetProducts,
    enabled: preview || router.query.preview !== null,
  });

  return <ProductsPage products={products} />;
}

export async function getStaticProps({ params = {}, preview = false }) {
  const productsData = await getClient(preview).fetch(query);
  const targetProducts = await sanityClient.fetch(`
    *[_type == 'product']{
      ...,
      'shopifyproduct': shopifyproduct[] ->
    }
  `);

  return {
    props: { preview, productsData, targetProducts },
  };
}

export default ProductsPageContainer;
