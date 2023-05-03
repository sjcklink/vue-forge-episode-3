// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  runtimeConfig: {
    OPENAI_API_KEY: "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",
  },
  ssr: false,
});
