import Client from "shopify-buy";

console.log(process.env.SHOPIFY_URL);

// Initializing a client to return content in the store's primary language
export const client = Client.buildClient({
    domain: "boyandgirlshops.myshopify.com",
    storefrontAccessToken: "e97d69ee571ca7df5808deaf6d64348e",
});

console.log("client", client);

import Cookies from "js-cookie";

const addProductToCart = async(product) => {
    console.log("product", product);
    Cookies.remove("cart");
    let checkoutId = Cookies.get("checkoutId");
    if (checkoutId === "undefined") {
        checkoutId = await createCheckout();
    }
    Cookies.set("checkoutId", checkoutId);
    const cart = await client.checkout.addLineItems(checkoutId, product);
    console.log("cart", cart);
    await storeCart(cart);
};
const getCart = async() => {
    return JSON.parse(window.localStorage.getItem("cart"));
};

const storeCart = async({
    lineItems,
    totalPrice,
    totalPriceV2,
    TotalTax,
    id,
    currencyCode,
    subTotalPrice,
    webUrl,
}) => {
    const cartInfo = {
        lineItems,
        totalPrice,
        totalPriceV2,
        TotalTax,
        id,
        currencyCode,
        subTotalPrice,
        webUrl,
    };
    const storage = window.localStorage;
    storage.setItem("cart", JSON.stringify(cartInfo));
    //   Object.keys(cartInfo).map((key) =>
    //     storage.setItem(key, JSON.stringify(cartInfo[key]))
    //   );
};
const createCheckout = async() => {
    console.log("fired");
    const { id } = await client.checkout.create();
    console.log(client.checkout.create());
    console.log("createCheckout", id);
    return id;
};
export { addProductToCart, getCart, createCheckout, storeCart };