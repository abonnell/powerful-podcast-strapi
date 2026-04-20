/**
 * `author-middleware` middleware
 */

import type { Core } from '@strapi/strapi';
import type { Context } from 'koa';

interface MiddlewareConfig {
  [key: string]: unknown;
}

export default (config: MiddlewareConfig, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: Context, next: () => Promise<any>) => {
    if (!ctx.query.populate) {
      ctx.query.populate = ["createdBy", "updatedBy"];
    }

    await next();
  };
};
