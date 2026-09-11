import { defineConfig } from "vitepress";

export default defineConfig({
  title: "tappunk",
  description: "tappunk — personal lab. Building tools for independent computing.",
  srcExclude: ["**/AGENTS.md"],
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/favicon-32x32.png", sizes: "32x32" }],
    ["link", { rel: "icon", type: "image/png", href: "/favicon-16x16.png", sizes: "16x16" }],
    ["link", { rel: "icon", type: "image/png", href: "/favicon-48x48.png", sizes: "48x48" }],
    ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }],
    ["link", { rel: "manifest", href: "/site.webmanifest" }]
  ],
  themeConfig: {
    lastUpdated: true,
    nav: [],
    socialLinks: [
      { icon: "github", link: "https://github.com/tappunk" },
      { icon: "x", link: "https://x.com/tappunk" }
    ]
  }
});
