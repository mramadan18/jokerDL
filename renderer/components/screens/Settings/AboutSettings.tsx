import { Card, CardBody, Button } from "@heroui/react";
import { Download } from "lucide-react";

export const AboutSettings = () => {
  return (
    <Card className="shadow-xl bg-linear-to-br from-violet-600/10 to-fuchsia-600/10 border-violet-500/20">
      <CardBody className="p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-linear-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/20 mb-4">
          <Download className="text-white w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black bg-linear-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          JokerDL
        </h2>
        <p className="text-xs font-bold text-violet-500/60 tracking-widest uppercase mb-4">
          Version 1.0.0 (Stable)
        </p>
        <p className="text-default-500 max-w-sm mb-6">
          JokerDL is a fast and powerful desktop video downloader built for
          simplicity and performance. Download your favorite content with just
          one click.
        </p>
        <div className="flex gap-4">
          <Button size="sm" variant="flat" color="secondary">
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
