import type { StrapiApp } from '@strapi/strapi/admin';

// Explicitly import Utrecht CSS for production builds
// These are required by @frameless/strapi-tiptap-editor
import '@utrecht/design-tokens/dist/index.css';
import '@utrecht/design-tokens/dist/dark/index.css';
import '@utrecht/component-library-css/dist/html.css';

export default {
  config: {
    locales: [],
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
