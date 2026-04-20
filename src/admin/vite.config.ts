import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Ensure Utrecht CSS is included in production builds
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Ensure node_modules CSS is processed
          includePaths: ['node_modules'],
        },
      },
    },
  });
};
