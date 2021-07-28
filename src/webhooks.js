import { createNextWebhooks } from "@sane-shopify/server";
// or
// import { createAWSWebhooks } from '@sane-shopify/server'
// or
// import { createWebhooks } from '@sane-shopify/server'
import dotEnv from "dotenv";

dotEnv.config();

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const authToken = process.env.SANITY_AUTH_TOKEN;
const shopName = process.env.SHOPIFY_SHOP_NAME;
const accessToken = process.env.SHOPIFY_STOREFRONT_TOKEN;

if (!projectId) throw new Error("You must provide a sanity project ID");
if (!dataset) throw new Error("You must provide a sanity dataset");
if (!authToken) throw new Error("You must provide a sanity auth token");
if (!shopName) throw new Error("You must provide a shopify shop name");
if (!accessToken) throw new Error("You must provide a shopify access token");

// optional, see below
const handleError = (err) => {
  Sentry.captureException(err);
};

// 🚨 Alpha breaking change: This configuration changed in 0.20.0. If you are getting errors after updating, put your `onError` handler on the `config` object, and pass that object into `createWebhooks` as the sole argument.

const config = {
  secrets: {
    sanity: {
      projectId,
      dataset,
      authToken,
    },
    shopify: {
      shopName,
      accessToken,
    },
  },
  onError: handleError,
};

export const webhooks = createNextWebhooks(config);
// or
// export const webhooks = createAWSWebhooks(config)
// or
// export const webhooks = createWebhooks(config)
