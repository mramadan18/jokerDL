export const APP_CONFIG = {
  name: "Remix DM",
  shortName: "RDM",
  titleSuffix: "Advanced Bulk & Playlist Downloader",
  domain: "remixdm.com",
  description:
    "A professional-grade desktop application for lightning-fast bulk media downloads, playlists, and high-quality video content from hundreds of sources.",
  links: {
    website: "https://remixdm.com",
    github: "https://github.com/mramadan18/remix-dm",
  },
  author: "Mahmoud Ramadan",
  slogan: "The Ultimate Media Hub",
  get version() {
    if (typeof window !== "undefined" && window["ipc"]) {
      return window["ipc"]["getVersion"]();
    }
    // If we are in the main process, we can try to get it from electron app
    try {
      // Use dynamic require to hide it from the renderer's bundler (Next.js)
      const electron = eval("require")("electron");
      if (electron && electron.app) {
        return electron.app.getVersion();
      }
    } catch (e) {
      // Ignore
    }
    return "1.0.0";
  },
  get isBeta() {
    return this.version.toLowerCase().includes("beta");
  },
};
