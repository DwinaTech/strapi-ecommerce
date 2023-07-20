"use strict";

/**
 * review controller
 */

const getQuery = (key, search) => {
  const querys = search?.replace("/api/reviews?", "")?.split("&");
  const query = querys.find((query) => query.includes(key));
  const queryValue = query?.replace(`${key}=`, "");
  return queryValue;
};

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::review.review", ({ strapi }) => ({
  async find(ctx) {
    const { originalUrl } = ctx;
    const { email } = ctx.state?.user || {};
    const productId = getQuery("productId", originalUrl);

    try {
      const data = await strapi.db.query("api::review.review").findMany({
        where: { productId },
      });

      const hasReviewAdded = data.find((review) => review.email === email);
      return { data: [...data], hasReviewAdded: !!hasReviewAdded };
    } catch (error) {
      ctx.response.status = 500;
      return error;
    }
  },
  async create(ctx) {
    const { email } = ctx.state.user;
    try {
      const res = await strapi.service("api::review.review").create({
        data: {
          ...ctx.request.body,
          email,
        },
      });

      return res;
    } catch (error) {
      ctx.response.status = 500;
      return error;
    }
  },
}));
