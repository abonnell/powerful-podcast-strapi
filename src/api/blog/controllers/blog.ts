/**
 * blog controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::blog.blog', ({ strapi }) => ({
  async find(ctx) {
    // Sanitize query params
    const sanitizedQueryParams: any = await this.sanitizeQuery(ctx);
    
    // Re-add createdBy and updatedBy to populate after sanitization
    // These are private fields that get stripped by sanitizeQuery
    if (!sanitizedQueryParams.populate) {
      sanitizedQueryParams.populate = {};
    }
    sanitizedQueryParams.populate.createdBy = { fields: ['id', 'firstname', 'lastname', 'username'] };
    sanitizedQueryParams.populate.updatedBy = { fields: ['id', 'firstname', 'lastname', 'username'] };
    
    // Get results from service
    const { results, pagination } = await strapi
      .service('api::blog.blog')
      .find(sanitizedQueryParams);
    
    // Store createdBy and updatedBy before sanitization
    const creatorFields = results.map((result: any) => ({
      createdBy: result.createdBy,
      updatedBy: result.updatedBy,
    }));
    
    // Sanitize the output
    const sanitizedResults = await Promise.all(
      results.map((result: any) => this.sanitizeOutput(result, ctx))
    );
    
    // Re-attach the creator fields after sanitization
    const finalResults = sanitizedResults.map((sanitized: any, index: number) => ({
      ...sanitized,
      ...(creatorFields[index].createdBy && { createdBy: creatorFields[index].createdBy }),
      ...(creatorFields[index].updatedBy && { updatedBy: creatorFields[index].updatedBy }),
    }));

    return this.transformResponse(finalResults, { pagination });
  },
  
  async findOne(ctx) {
    const { id } = ctx.params;
    const sanitizedQueryParams: any = await this.sanitizeQuery(ctx);
    
    // Re-add createdBy and updatedBy to populate after sanitization
    if (!sanitizedQueryParams.populate) {
      sanitizedQueryParams.populate = {};
    }
    sanitizedQueryParams.populate.createdBy = { fields: ['id', 'firstname', 'lastname', 'username'] };
    sanitizedQueryParams.populate.updatedBy = { fields: ['id', 'firstname', 'lastname', 'username'] };
    
    // Get result from service
    const result: any = await strapi
      .service('api::blog.blog')
      .findOne(id, sanitizedQueryParams);
    
    // Store createdBy and updatedBy before sanitization
    const createdBy = result.createdBy;
    const updatedBy = result.updatedBy;
    
    // Sanitize the output
    const sanitized: any = await this.sanitizeOutput(result, ctx);
    
    // Re-attach the creator fields after sanitization
    const finalResult = {
      ...sanitized,
      ...(createdBy && { createdBy }),
      ...(updatedBy && { updatedBy }),
    };

    return this.transformResponse(finalResult);
  },
}));
