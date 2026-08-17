import { defineConfig } from "vitepress";

export default defineConfig({
  title: "tappunk",
  description: "Richal Aleman — personal lab. Building tools for independent computing.",
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
    nav: [
      { text: "Projects", link: "/projects", match: /^\/projects/ }
    ],
    sidebar: [
      {
        text: "tnk",
        items: [
          { text: "Introduction", link: "/tnk" },
          { text: "Quickstart", link: "/tnk/quickstart" },
          { text: "Installation", link: "/tnk/installation" },
          { text: "Commands", link: "/tnk/commands" },
          { text: "Configuration", link: "/tnk/configuration" },
          { text: "Sandboxing", link: "/tnk/sandbox" },
          { text: "Security", link: "/tnk/security" },
          { text: "Concepts", link: "/tnk/concepts" },
          { text: "Troubleshooting", link: "/tnk/troubleshooting" }
        ]
      },
      {
        text: "About",
        items: [
          { text: "Projects", link: "/projects" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/tappunk" },
      { icon: "x", link: "https://x.com/richalaleman" }
    ],
    footer: {
      message: "richal@tappunk.com",
      copyright: ""
    },
    search: {
      provider: "local"
    }
  }
});
