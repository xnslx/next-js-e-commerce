import Error from "next/error";
import { groq } from "next-sanity";
import { useRouter } from "next/router";
import ProductPage from "../../components/ProductPage";
import {
  getClient,
  usePreviewSubscription,
  sanityClient,
} from "../../utils/sanity";

const query = groq`*[_type == "product" && slug.current == $slug][0]`;

function ProductPageContainer({ productData, targetProduct, preview }) {
  const router = useRouter();
  if (!router.isFallback && !targetProduct?.slug) {
    return <Error statusCode={404} />;
  }

  const { data: product = {} } = usePreviewSubscription(query, {
    params: { slug: targetProduct?.slug?.current },
    initialData: targetProduct,
    enabled: preview || router.query.preview !== null,
  });

  const {
    _id,
    title,
    defaultProductVariant,
    mainImage,
    blurb,
    body,
    tags,
    vendor,
    categories,
    slug,
  } = product;
  const { shopifyproduct } = targetProduct;

  return (
    <ProductPage
      id={_id}
      title={title}
      defaultProductVariant={defaultProductVariant}
      mainImage={mainImage}
      blurb={blurb}
      body={body}
      tags={tags}
      vendor={vendor}
      categories={categories}
      slug={slug?.current}
      shopifyproduct={shopifyproduct}
    />
  );
}

export async function getStaticProps({ params, preview = false }) {
  const productData = await getClient(preview).fetch(query, {
    slug: params.slug,
  });

  const pageSlug = params.slug;

  const productquery = `*[_type == "product" && slug.current == $pageSlug][0]{
    ...,
      'shopifyproduct': shopifyproduct[] ->
  }`;

  const targetProduct = await sanityClient.fetch(productquery, { pageSlug });

  return {
    props: { preview, productData, targetProduct },
  };
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `*[_type == "product" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default ProductPageContainer;
