type AppBarProps = {
  onMenuClick: () => void;
};

function AppBar({ onMenuClick }: AppBarProps) {
  return (
    <header className="w-full h-14 bg-white border-b flex items-center justify-between px-4 fixed top-0 left-0 z-40">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={onMenuClick}
        >
          ☰
        </button>

        <span className="font-semibold text-lg">My App</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Hi, Sandy</span>
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
}

export default AppBar;
