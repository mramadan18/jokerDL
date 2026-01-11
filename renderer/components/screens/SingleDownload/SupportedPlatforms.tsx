import { motion } from "framer-motion";
import {
  Globe,
  Youtube,
  Instagram,
  Twitter,
  Facebook,
  Twitch,
  Video,
  Music2,
} from "lucide-react";
import { PLATFORMS } from "../../../types/download";

const PLATFORM_ICONS: Record<string, any> = {
  youtube: Youtube,
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  twitch: Twitch,
  vimeo: Video,
  tiktok: Music2,
};

export const SupportedPlatforms = () => {
  const handlePlatformClick = (domain: string) => {
    window.ipc.invoke("shell:open-external", `https://${domain}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-12 text-center"
    >
      <p className="text-sm text-default-400 mb-4">Supported platforms:</p>
      <div className="flex justify-center gap-6 flex-wrap">
        {Object.values(PLATFORMS)
          .slice(0, 7)
          .map((p) => {
            const Icon = PLATFORM_ICONS[p.icon] || Globe;
            return (
              <div
                key={p.name}
                onClick={() => handlePlatformClick(p.domains[0])}
                className="flex items-center gap-2 text-default-500 hover:text-primary transition-all cursor-pointer hover:scale-105 active:scale-95 group"
                title={`Visit ${p.name}`}
              >
                <Icon size={16} className="group-hover:animate-pulse" />
                <span className="text-sm">{p.name}</span>
              </div>
            );
          })}
        <span className="text-default-400 text-sm">+1000 more</span>
      </div>
    </motion.div>
  );
};
