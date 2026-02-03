import { useState } from "react";
import AppBar from "./AppBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function ContentContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar onMenuClick={() => setSidebarOpen(true)} />
      <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="pt-14 md:pl-64">
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ContentContainer;
