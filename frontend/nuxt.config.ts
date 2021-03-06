
const nodeEnv = process.env.NODE_ENV
require('dotenv').config({
  path: `.env.${nodeEnv}`
})

const APP_TITLE = '하루일기'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: `%s - ${APP_TITLE}`,
    title: APP_TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Jua&family=Noto+Sans+KR&display=swap' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/v-calendar.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    //  https://typescript.nuxtjs.org/guide/setup
    '@nuxt/typescript-build',
    //  https://composition-api.nuxtjs.org/getting-started/setup
    '@nuxtjs/composition-api'

  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
    [
      'nuxt-buefy', {
        css: true,
        materialDesignIcons: true
      }
    ],
    'vuetify-dialog/nuxt'
  ],

  pwa: {
    meta: {
      name: '하루일기',
      author: 'eggplantiny',
      lang: 'kr',
      theme_color: '#112233'
    }
  },

  router: {
    middleware: ['themeColor']
  },

  //  Firebase : https://firebase.nuxtjs.org/guide/getting-started
  firebase: {
    config: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID
    },
    services: {
      //  https://firebase.nuxtjs.org/service-options/auth/
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedMutation: 'auth/ON_AUTH_STATE_CHANGED_MUTATION',
          onAuthStateChangedAction: 'auth/onAuthStateChangedAction',
          subscribeManually: true
        }
      }
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.BASE_API_URL
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    treeShake: true,
    customVariables: [
      '~/assets/variables.scss'
    ]
  },

  vuetifyDialog: {
    property: '$dialog',
    confirm: {
      actions: {
        false: '아니요',
        true: '네'
      }
    }
  },

  loading: {
    color: 'white',
    height: '5px'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
