type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

function SideBar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r z-40 transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="h-14 flex items-center px-4 border-b font-semibold">
          Menu
        </div>

        <nav className="p-4 flex flex-col gap-2">
          <SidebarItem label="Dashboard" />
          <SidebarItem label="Users" />
          <SidebarItem label="Settings" />
          <SidebarItem label="Logout" />
        </nav>
      </aside>
    </>
  );
}

function SidebarItem({ label }: { label: string }) {
  return (
    <button className="text-left px-3 py-2 rounded hover:bg-gray-100 text-sm">
      {label}
    </button>
  );
}

export default SideBar;
