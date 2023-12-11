// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    exposeConfig: true,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_ENV_API_BASE_URL || "default_api_url",
    },
  },
})
