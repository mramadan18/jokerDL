import { Card, CardBody, Button } from "@heroui/react";
import { Download } from "lucide-react";

import { APP_CONFIG } from "../../../config/app-config";

export const AboutSettings = () => {
  return (
    <Card className="shadow-xl bg-linear-to-br from-brand-cyan/10 to-brand-purple/10 border-brand-cyan/20">
      <CardBody className="p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-linear-to-br from-brand-cyan to-brand-purple rounded-2xl flex items-center justify-center shadow-lg shadow-brand-cyan/20 mb-4">
          <Download className="text-white w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black bg-linear-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">
          {APP_CONFIG.name}
        </h2>
        <p className="text-xs font-bold text-primary/60 tracking-widest uppercase mb-4">
          Version {APP_CONFIG.version} (Stable)
        </p>
        <p className="text-default-500 max-w-sm mb-6">
          {APP_CONFIG.description}
        </p>
        <div className="flex gap-4">
          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={() => window.open(APP_CONFIG.links.website, "_blank")}
          >
            Website
          </Button>
          <Button size="sm" variant="flat" color="secondary">
            Check Updates
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
