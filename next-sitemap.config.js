/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.waarblijfthet.nl",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/aanbod/intake", "/resultaat"],
   