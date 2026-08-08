import Button from "./Button";
import useTheme from "../../context/theme/useTheme";

function ThemeToggle() {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  function handleToggleTheme() {
    toggleTheme();
  }

  return (
    <Button
      variant="secondary"
      size="small"
      onClick={handleToggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light"
        ? "🌙 Dark"
        : "☀️ Light"}
    </Button>
  );
}

export default ThemeToggle;