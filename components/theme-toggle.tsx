import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
const ThemeToggle = () => {
  const theme = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => theme.setTheme(theme.theme === "dark" ? "light" : "dark")}
    >
      {theme.theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ThemeToggle;
