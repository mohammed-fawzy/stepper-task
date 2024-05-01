// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-primevue', '@nuxtjs/i18n', '@vee-validate/nuxt'],
  runtimeConfig : {
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  },
  ssr: false,
  i18n: {
    defaultLocale: 'en',
    // locales: ['en', 'ar'],
    vueI18n: "./i18n/i18nConfig.js",
  },
  primevue: {
    options: {
      unstyled: true
    },
    // importPT: {from: fileURLToPath(new URL('./assets/presets/lara/', import.meta.url))},
    importPT: { as: 'Lara', from: './assets/presets/lara' },

  },
  plugins: ['~/plugins/phone-input.js'],
  css: ['primevue/resources/themes/aura-light-green/theme.css', '~/assets/css/main.css', '~/assets/styles.scss',     'vue3-tel-input/dist/vue3-tel-input.css'
],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})