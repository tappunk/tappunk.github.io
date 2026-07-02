import { defineConfig } from "vitepress";

export default defineConfig({
  title: "tappunk",
  description:
    "Unix-first local AI systems, zero-trust runtimes, and production-grade OSS tooling.",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    siteTitle: "tappunk",
    logo: null,
    nav: [
      { text: "Products", link: "/products/" },
      { text: "muthr Docs", link: "/muthr/" },
      { text: "About", link: "/about/" },
      { text: "Community", link: "/community/" }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/tappunk" }
    ],
    outline: {
      level: [2, 3],
      label: "On this page"
    },
    sidebar: {
      "/muthr/": [
        {
          text: "muthr",
          items: [
            { text: "Overview", link: "/muthr/" },
            { text: "Quickstart", link: "/muthr/quickstart" },
            { text: "Installation", link: "/muthr/installation" },
            { text: "Commands", link: "/muthr/commands" },
            { text: "Configuration", link: "/muthr/configuration" },
            { text: "Profiles", link: "/muthr/profiles" },
            { text: "Sandbox Architecture", link: "/muthr/sandbox-architecture" },
            { text: "Security", link: "/muthr/security" },
            { text: "Troubleshooting", link: "/muthr/troubleshooting" }
          ]
        }
      ]
    },
    footer: {
      message: "Built with disciplined interfaces and explicit contracts.",
      copyright: "Copyright 2026 tappunk"
    },
    search: {
      provider: "local"
    }
  }
});
