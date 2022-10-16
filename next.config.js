/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    mapbox_key: "pk.eyJ1IjoiaC10ZWNoIiwiYSI6ImNsN3AxMDR6MzBwOHYzb25zNnl3Zjc4eHAifQ.uSN0ORQ4zG2ubae--AAsjw",
    mapStyle: "mapbox://styles/h-tech/cl8szmvbz001914qgmr0zt27j",
  },
}
module.exports = nextConfig