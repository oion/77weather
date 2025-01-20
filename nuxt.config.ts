// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  ssr: true,

  runtimeConfig: {
    public: {
      openweathermapApiKey: '', // can be overridden by NUXT_PUBLIC_API_KEY environment variable
    },
  },

  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxt/test-utils/module', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
});
