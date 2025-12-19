/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Global Currency Exchange Rate Query Tool`,
    description: `Real-time and historical foreign exchange rates at a glance. Convert any currency pair with up-to-date data and intuitive charts.`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-YC1WNDZ70E"],
        pluginConfig: {
          head: true,          // 把脚本插到 <head>
          respectDNT: true,    // 可选：尊重 Do-Not-Track
        },
      },
    },

    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `currencylist`,
    //     path: `${__dirname}/src/data`,
    //   },
    // },
    // `gatsby-transformer-json`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `json`,
    //     path: `${__dirname}/src/json`,
    //   }
    // },
    // "gatsby-plugin-json", 
    "gatsby-plugin-react-helmet",
  ],
}
