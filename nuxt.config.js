import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: titleChunk => {
      return titleChunk ? `${titleChunk} | ${process.env.SHORT_TITLE}` : `${process.env.SHORT_TITLE}`;
    },
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'author', content: 'BitSong Team' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.SEO_DESCRIPTION },
      { name: 'keywords', content: 'bitsong, explorer, block explorer, btsg, cosmos, atom, validators, staking, search, blockchain, crypto, currency, analytics' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:title', name: 'og:title', content: process.env.SEO_TITLE },
      { property: 'og:description', content: process.env.SEO_DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: process.env.SEO_TITLE },
      { property: 'og:url', content: process.env.SEO_URL },
      { property: 'og:image', content: process.env.SEO_IMAGE },
      { property: 'og:image:alt', content: process.env.SEO_IMAGE_ALT },
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:title', content: process.env.SEO_TITLE },
      { property: 'twitter:description', content: process.env.SEO_DESCRIPTION },
      { property: 'twitter:site', content: process.env.SEO_TWITTER_HANDLE },
      { property: 'twitter:image', content: process.env.SEO_IMAGE },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700;800&display=swap"
      },
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  env: {
    SHORT_TITLE: process.env.SHORT_TITLE,
    STAKEDENOM: process.env.STAKEDENOM,
    MICROSTAKEDENOM: process.env.MICROSTAKEDENOM,
    LCD: process.env.LCD,
    //RPC: process.env.RPC,
    API: process.env.API,
    SOCKET: process.env.SOCKET,
    CHAIN_ID: process.env.CHAIN_ID,
    GA_ID: process.env.GA_ID,
    SEO_TITLE: process.env.SEO_TITLE,
    SEO_DESCRIPTION: process.env.SEO_DESCRIPTION,
    SEO_URL: process.env.SEO_URL,
    SEO_IMAGE: process.env.SEO_IMAGE,
    SEO_IMAGE_ALT: process.env.SEO_IMAGE_ALT,
    SEO_TWITTER_HANDLE: process.env.SEO_TWITTER_HANDLE,
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{
    src: "~/plugins/app.js",
    ssr: false
  }, {
    src: "~/plugins/seo-gtag.js",
    ssr: false
  }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: false
  },

  proxy: {
    // '/lcd': {
    //   target: process.env.LCD,
    //   pathRewrite: {
    //     '^/lcd': '/'
    //   }
    // },
    // '/socket': {
    //   target: process.env.SOCKET,
    //   changeOrigin: true,
    // }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: false,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.red.darken1,
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    //analyze: true,
    //extractCSS: true,
    extend(config, ctx) {
      config.node = {
        fs: "empty"
      };
      // // Optimisation
      // if (ctx && ctx.isClient) {
      //   config.optimization.splitChunks.maxSize = 100000
      // }

      // // The below solution is taken from
      // // https://github.com/visualfanatic/vue-svg-loader/issues/75#issuecomment-468342586
      // // This sollution allows optional inlining of the SVG markup with vue-svg-loader with an
      // // ?inline query. Otherwise, normal url-loader behaviour occurs
      // const svgRule = config.module.rules.find((rule) => rule.test.test('.svg'))

      // // Overwrite the test regex (remove .svg file extension)
      // svgRule.test = /\.(png|jpe?g|gif|webp)$/i

      // config.module.rules.push({
      //   test: /\.(svg|svgz)(\?.+)?$/,
      //   oneOf: [
      //     {
      //       loader: 'vue-svg-loader',
      //       resourceQuery: /inline/
      //     },
      //     // Add original url-loader config to resolve every other svg without inline query
      //     svgRule.use[0]
      //   ]
      // })
    }
  }
}
