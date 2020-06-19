import path from 'path'
import colors from 'vuetify/es5/util/colors'
import glob from 'glob'
import head from './config/head'
import { modules, modulesSettings } from './config/modules'
import plugins from './config/plugins'
import build from './config/build'
import css from './config/css'
import { routeMap, otherRoutes } from './config/generate'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  // head: {
  //   titleTemplate: '%s - ' + process.env.npm_package_name,
  //   title: process.env.npm_package_name || '',
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //     {
  //       hid: 'description',
  //       name: 'description',
  //       content: process.env.npm_package_description || ''
  //     }
  //   ],
  //   link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  // },
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
  plugins,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules,
  ...modulesSettings,
  // modules: [
  //   // Doc: https://axios.nuxtjs.org/usage
  //   '@nuxtjs/axios',
  //   '@nuxtjs/pwa',
  //   // Doc: https://github.com/nuxt-community/dotenv-module
  //   '@nuxtjs/dotenv',
  //   '@nuxtjs/markdownit'
  // ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
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
  build
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
