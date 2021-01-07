import path from 'path'
import colors from 'vuetify/es5/util/colors'
import glob from 'glob'
import head from './config/head'
import { modules, modulesSettings } from './config/modules'
import build from './config/build'
import css from './config/css'
import { routeMap, otherRoutes } from './config/generate'

export default {
  mode: 'spa',
  head,
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css,
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/Globals',
    '~/plugins/OptiImage',
    '~/plugins/Disqus',
    '~/plugins/EventBus',
    '~/plugins/Components',
    '~/plugins/Youtube',
    '~/plugins/init.client.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },
  /*
   ** Nuxt.js modules
   */
  modules,
  ...modulesSettings,
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.URL || 'http://localhost:3000'
  },
  generate: {
    routes: otherRoutes.concat(getDynamicPaths(routeMap))
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
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
  /*
   ** Build configuration
   */
  build,
  env: {
    discusSite: process.env.DISCUS_SITE || 'themovieshrink',
    googleAnalyticsID: process.env.GOOGLE_ANALYTICS_ID
  }
}

/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map((url) => {
      const filepathGlob = urlFilepathTable[url]
      return glob.sync(filepathGlob, { cwd: 'content' }).map((filepath) => {
        return `${url}/${path.basename(filepath, '.md')}`
      })
    })
  )
}
