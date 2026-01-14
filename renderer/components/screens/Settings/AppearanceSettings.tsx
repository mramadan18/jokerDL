import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import { Sun, Monitor, Moon } from "lucide-react";

interface AppearanceSettingsProps {
  theme?: string;
  setTheme: (theme: string) => void;
  mounted: boolean;
}

export const AppearanceSettings = ({
  theme,
  setTheme,
  mounted,
}: AppearanceSettingsProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="font-bold text-lg px-6 pt-6">
        Appearance
      </CardHeader>
      <CardBody className="px-6 pb-6 pt-2 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-medium text-sm">Theme Mode</span>
            <span className="text-xs text-default-400">
              Select your interface theme
            </span>
          </div>
          <div className="flex bg-default-100 p-1 rounded-lg">
            <Button
              size="sm"
              variant={mounted && theme === "light" ? "solid" : "light"}
              color={mounted && theme === "light" ? "primary" : "default"}
              onPress={() => setTheme("light")}
              isIconOnly
            >
              <Sun size={16} />
            </Button>
            <Button
              size="sm"
              variant={mounted && theme === "system" ? "solid" : "light"}
              color={mounted && theme === "system" ? "primary" : "default"}
              onPress={() => setTheme("system")}
              isIconOnly
            >
              <Monitor size={16} />
            </Button>
            <Button
              size="sm"
              variant={mounted && theme === "dark" ? "solid" : "light"}
              color={mounted && theme === "dark" ? "primary" : "default"}
              onPress={() => setTheme("dark")}
              isIconOnly
            >
              <Moon size={16} />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
