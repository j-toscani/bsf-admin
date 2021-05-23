"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.author = ctx.state.user.id;
      entity = await strapi.services.tournament.create(data, { files });
    } else {
      ctx.request.body.host = ctx.state.user.id;
      entity = await strapi.services.tournament.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.tournament });
  },

  /**
   * Delete a record.
   *
   * @return {Object}
   */

  async delete(ctx) {
    const { id } = ctx.params;

    const [tournament] = await strapi.services.tournament.find({
      id,
      "host.id": ctx.state.user.id,
    });

    if (!tournament) {
      return ctx.unauthorized(`You can't delete this entry`);
    }

    return sanitizeEntity(entity, { model: strapi.models.restaurant });
  },

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [tournament] = await strapi.services.tournament.find({
      id: ctx.params.id,
      "host.id": ctx.state.user.id,
    });

    if (!tournament) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.tournament.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.tournament.update(
        { id },
        ctx.request.body
      );
    }

    return sanitizeEntity(entity, { model: strapi.models.tournament });
  },
};
