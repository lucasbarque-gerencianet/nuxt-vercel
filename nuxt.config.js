import { resolve } from 'path';
import { getConfig } from './infra/config/config.ts';

export default async () => {
  const config = await getConfig();

  return {
    target: 'static',
    head: {
      title: 'novo-portal-dev',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;900&display=swap' },
      ],
    },
    css: ['~/assets/style/app'],
    plugins: [],
    components: 'true',
    buildModules: ['@nuxt/typescript-build', '@nuxt/image'],
    modules: ['@nuxtjs/axios'],
    build: {},
    alias: {
      '@style': resolve(__dirname, './assets/style'),
      '@': resolve(__dirname, './node_modules'),
    },
    image: {
      screens: {
        xs: 320,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1366,
        xxl: 1536,
        '2xl': 1920,
      },
      presets: {
        default: {
          modifiers: {
            format: 'webp',
          },
        },
        avatar: {
          modifiers: {
            format: 'png',
            width: 50,
            height: 50,
          },
        },
      },
    },
    srcDir: 'src/',
    env: config.environments,
    server: config.server,
  };
};
