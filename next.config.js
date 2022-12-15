/** @type {import('next').NextConfig} */
const path = require('path')
const withSass = require('@zeit/next-sass');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  env: {
    mapbox_key: "pk.eyJ1IjoiaC10ZWNoIiwiYSI6ImNsN3AxMDR6MzBwOHYzb25zNnl3Zjc4eHAifQ.uSN0ORQ4zG2ubae--AAsjw",
    mapStyle: "mapbox://styles/h-tech/cl8szmvbz001914qgmr0zt27j",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    loader: 'akamai',
    path: '.',
  },
}
module.exports = withSass({
  /* bydefault config  option Read For More Optios
  here https://github.com/vercel/next-plugins/tree/master/packages/next-sass
  */
  cssModules: true
})
module.exports = nextConfig