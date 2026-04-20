/**
 * `author-middleware` middleware
 */

import type { Core } from '@strapi/strapi';

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: any) => {
    // Ensure createdBy and updatedBy are always populated
    // These are private fields by default in Strapi v5, so we need to explicitly populate them
    if (!ctx.query.populate) {
      ctx.query.populate = { createdBy: true, updatedBy: true };
    } else {
      // If populate already exists, merge our fields with existing ones
      // Handle both array and object formats
      if (Array.isArray(ctx.query.populate)) {
        // Convert array to object format and add our fields
        const populateObj: any = {};
        ctx.query.populate.forEach((field: string) => {
          populateObj[field] = true;
        });
        populateObj.createdBy = true;
        populateObj.updatedBy = true;
        ctx.query.populate = populateObj;
      } else if (typeof ctx.query.populate === 'object') {
        // Already an object, just add our fields
        ctx.query.populate.createdBy = true;
        ctx.query.populate.updatedBy = true;
      } else if (typeof ctx.query.populate === 'string') {
        // Single string populate, convert to object
        ctx.query.populate = {
          [ctx.query.populate]: true,
          createdBy: true,
          updatedBy: true,
        };
      }
    }

    await next();
  };
};
