import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { PLATFORMS } from "../../../types/download";

export const SupportedPlatforms = () => {
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
          .slice(0, 6)
          .map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-2 text-default-500 hover:text-primary transition-colors"
            >
              <Globe size={16} />
              <span className="text-sm">{p.name}</span>
            </div>
          ))}
        <span className="text-default-400 text-sm">+1000 more</span>
      </div>
    </motion.div>
  );
};
