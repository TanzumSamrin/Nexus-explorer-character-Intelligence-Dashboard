import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Characters",
    path: "/characters",
  },
  {
    label: "Episodes",
    path: "/episodes",
  },
  {
    label: "Locations",
    path: "/locations",
  },
  {
    label: "Watchlist",
    path: "/watchlist",
  },
  {
    label: "Compare",
    path: "/compare",
  },
  {
    label: "Settings",
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">N</div>

        <div>
          <h1>Nexus Explorer</h1>
          <span>Character Intelligence</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;