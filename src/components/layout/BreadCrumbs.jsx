import { Link, useLocation } from "react-router-dom";

const labelMap = {
  characters: "Characters",
  episodes: "Episodes",
  locations: "Locations",
  watchlist: "Watchlist",
  compare: "Compare",
  settings: "Settings",
};

function Breadcrumbs() {
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter(Boolean);

  if (pathSegments.length === 0) {
    return (
      <div className="breadcrumbs">
        <span>Dashboard</span>
      </div>
    );
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Dashboard</Link>

      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;

        const label =
          labelMap[segment] ||
          (pathSegments[index - 1] === "characters"
            ? `Character #${segment}`
            : segment);

        return (
          <span key={`${segment}-${index}`}>
            <span className="breadcrumb-separator">/</span>

            {isLast ? (
              <span>{label}</span>
            ) : (
              <span>{label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;