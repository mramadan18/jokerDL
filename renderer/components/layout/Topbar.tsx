import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import {
  Sun,
  Moon,
  Minus,
  Square,
  X,
  Copy,
  Settings,
  RefreshCw,
  Terminal,
  ChevronRight,
} from "lucide-react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useWindowControls } from "../../hooks/use-window-controls";

import { APP_CONFIG } from "../../config/app-config";

const Topbar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isMaximized, minimize, maximize, close, reload, toggleDevTools } =
    useWindowControls();

  // Helper to get title based on path
  const getPageTitle = (path: string) => {
    const titles: Record<string, string> = {
      "/home": "Quick Download",
      "/playlist": "Playlist & Channel",
      "/multi": "Multiple Links",
      "/downloads": "Downloads Manager",
      "/history": "Download History",
      "/settings": "Settings & Preferences",
    };
    return titles[path] || "Remix DM";
  };

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header
      className="h-14 w-full bg-background/80 backdrop-blur-md border-b border-divider flex items-center justify-between px-4 select-none z-50 sticky top-0"
      style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
    >
      <div
        className="flex items-center gap-3"
        style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 tracking-tighter uppercase">
            {APP_CONFIG.shortName}
          </span>
          <ChevronRight size={14} className="text-default-300" />
          <span className="text-sm font-bold text-default-600 tracking-tight">
            {getPageTitle(router.pathname)}
          </span>
        </div>
      </div>

      <div
        className="flex items-center gap-2"
        style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
      >
        {process.env.NODE_ENV === "development" && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="text-default-500 hover:text-foreground hover:bg-default-100"
              >
                <Settings size={18} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Settings Menu" variant="flat">
              <DropdownItem
                key="reload"
                startContent={<RefreshCw size={16} />}
                onPress={reload}
              >
                Reload App
              </DropdownItem>
              <DropdownItem
                key="devtools"
                startContent={<Terminal size={16} />}
                onPress={toggleDevTools}
              >
                Developer Tools
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}

        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-default-500 hover:text-foreground hover:bg-default-100"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )
          ) : (
            <div className="w-[18px] h-[18px]" />
          )}
        </Button>

        <div className="w-px h-4 bg-divider mx-2" />

        <div className="flex items-center gap-1">
          <button
            onClick={minimize}
            className="p-2 text-default-500 hover:bg-default-100 rounded-md transition-colors focus:outline-none"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={maximize}
            className="p-2 text-default-500 hover:bg-default-100 rounded-md transition-colors focus:outline-none"
          >
            {isMaximized ? <Copy size={12} /> : <Square size={14} />}
          </button>
          <button
            onClick={close}
            className="p-2 text-default-500 hover:bg-danger/10 hover:text-danger rounded-md transition-colors focus:outline-none"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
