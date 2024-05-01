// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-primevue', '@nuxtjs/i18n', '@vee-validate/nuxt', '@nuxt/test-utils/module'],
  runtimeConfig : {
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  },
  ssr: false,
  primevue: {
    options: {
      unstyled: true
    },
    importPT: { as: 'Lara', from: './assets/presets/lara' },

  },
  plugins: ['~/plugins/phone-input.js', '~/plugins/vueGoogleMaps.js'],
  css: ['primevue/resources/themes/aura-light-green/theme.css', '~/assets/css/main.css', '~/assets/styles.scss', 'vue3-tel-input/dist/vue3-tel-input.css'
],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        "@fawmi/vue-google-maps",
        "fast-deep-equal",
      ],
    },
  }
})