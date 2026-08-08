function Topbar() {
  return (
    <header className="topbar">
      <div>
        <p className="topbar-label">Nexus Explorer</p>
        <h2>Character Intelligence Dashboard</h2>
      </div>

      <div className="topbar-actions">
        <button type="button" className="topbar-button">
          Search
        </button>

        <button type="button" className="topbar-button">
          Theme
        </button>
      </div>
    </header>
  );
}

export default Topbar;