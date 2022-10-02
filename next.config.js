/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    mapbox_key: "pk.eyJ1IjoiaC10ZWNoIiwiYSI6ImNsN3AxMDR6MzBwOHYzb25zNnl3Zjc4eHAifQ.uSN0ORQ4zG2ubae--AAsjw",
    mapStyle: "mapbox://styles/h-tech/cl8onv6w2001d14ph75fw2lla",
    host: "127.0.0.1",
    user: "root",
    password: "@rahatrock258@",
    database: "bio_diversity"
  },
}
module.exports = nextConfig