import type { StrapiApp } from '@strapi/strapi/admin';

// Import Utrecht CSS for TipTap editor styling
// This CSS file contains all necessary Utrecht design system styles
import './utrecht-styles.css';

export default {
  config: {
    locales: [],
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
