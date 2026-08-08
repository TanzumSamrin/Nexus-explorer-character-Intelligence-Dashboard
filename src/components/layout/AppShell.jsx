import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Breadcrumbs from "./BreadCrumbs";

function AppShell() {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <Topbar />

        <main className="page-container">
          <Breadcrumbs />

          <section className="page-content">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
}

export default AppShell;