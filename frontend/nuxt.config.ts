// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt', '@nuxt/ui'],

  devServer: {
    port: 3001
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3000',
    },
  },

  compatibilityDate: '2025-05-15',
  devtools: { enabled: true }
})
