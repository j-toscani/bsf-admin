"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  find(params, populate) {
    return strapi
      .query("tournament")
      .find(params, [
        "contestants",
        { path: "games", populate: ["performances"] },
      ]);
  },
  findOne(params, populate) {
    return strapi.query("tournament").findOne(params, [
      {
        path: "games",
        populate: [{ path: "performances", populate: "player" }],
      },
    ]);
  },
};
