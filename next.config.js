const STUDIO_REWRITE = {
    source: "/studio/:path*",
    destination: process.env.NODE_ENV === "development" ?
        "http://localhost:3333/studio/:path*" :
        "/studio/index.html",
};

module.exports = {
    rewrites: () => [STUDIO_REWRITE],
};

module.exports = {
    images: {
        domains: ["xnslx.s3.us-east-2.amazonaws.com"],
    },
};