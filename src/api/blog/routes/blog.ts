/**
 * blog router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::blog.blog', {
  config: {
    find: {
      middlewares: ["api::blog.author-middleware"],
    },
    findOne: {
      middlewares: ["api::blog.author-middleware"],
    },
  },  
});
