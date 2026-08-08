import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";

import AppShell from "../components/layout/AppShell";

import DashboardPage from "../pages/DashboardPage";
import CharacterListPage from "../pages/CharacterListPage";
import CharacterDetailPage from "../pages/CharacterDetailPage";
import EpisodeListPage from "../pages/EpisodeListPage";
import LocationListPage from "../pages/LocationListPage";
import WatchlistPage from "../pages/WatchlistPage";
import ComparePage from "../pages/ComparePage";
import SettingsPage from "../pages/SettingsPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />

        <Route path="/characters" element={<CharacterListPage />} />

        <Route
          path="/characters/:id"
          element={<CharacterDetailPage />}
        />

        <Route path="/episodes" element={<EpisodeListPage />} />

        <Route path="/locations" element={<LocationListPage />} />

        <Route path="/watchlist" element={<WatchlistPage />} />

        <Route path="/compare" element={<ComparePage />} />

        <Route path="/settings" element={<SettingsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function AppRouter() {
  const routerMode = import.meta.env.VITE_ROUTER_MODE || "browser";

  const Router =
    routerMode === "hash" ? HashRouter : BrowserRouter;

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default AppRouter;