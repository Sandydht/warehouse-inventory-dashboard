import { useState } from "react";
import AppBar from "./AppBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function ContentContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full h-auto min-h-screen bg-gray-100">
      <AppBar onMenuClick={() => setSidebarOpen(true)} />
      <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="pt-15.25 md:pl-64">
        <div className="md:px-10 md:py-5 p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ContentContainer;
