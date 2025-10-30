/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://nextjs-sxentra-website.vercel.app/", // 🔗 Change to your actual domain
  generateRobotsTxt: true,        // ✅ Generates robots.txt as well
  sitemapSize: 7000,
  exclude: ["/admin/*"],          // (optional) pages to skip
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
    ],
  },
};
