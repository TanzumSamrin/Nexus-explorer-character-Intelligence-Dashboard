import ThemeToggle from "../ui/ThemeToggle";
import CrashTest from "../error/CrashTest";

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <h1>Nexus Explorer</h1>

        <p>
          Character Intelligence Dashboard
        </p>
      </div>

      <div className="topbar-actions">
        <ThemeToggle />

        <CrashTest />

        <button
          type="button"
          className="topbar-button"
        >
          Search
        </button>

        <button
          type="button"
          className="topbar-button"
        >
          Theme
        </button>
      </div>
    </header>
  );
}

export default Topbar;