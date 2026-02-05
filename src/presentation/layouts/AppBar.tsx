import { useAppSelector } from "../store/hooks";
import Menu24pxOutlinedBlackIcon from "../assets/images/svg/menu_24px_outlined_black.svg";
import PermIdentity24pxWhiteIcon from "../assets/images/svg/perm_identity_24px_white.svg";

type AppBarProps = {
  onMenuClick: () => void;
};

function AppBar({ onMenuClick }: AppBarProps) {
  const { data } = useAppSelector((state) => state.user.userProfile);

  return (
    <header className="w-full h-auto px-4 py-2 min-h-15.25 max-h-15.25 bg-white border-b border-gray-200 shadow-md flex items-center justify-between gap-2 fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center gap-3">
        <button
          className="w-full h-full min-w-11 max-w-11 min-h-11 max-h-11 flex items-center justify-center cursor-pointer rounded hover:bg-gray-100 md:hidden"
          onClick={onMenuClick}
        >
          <img
            src={Menu24pxOutlinedBlackIcon}
            alt="Menu icon"
            className="w-full h-full min-w-6 max-w-6 min-h-6 max-h-6"
          />
        </button>

        <p className="text-left text-[14px] leading-5 font-semibold line-clamp-1">
          Warehouse Inventory Dashboard
        </p>
      </div>

      <div className="flex items-center justify-end gap-2">
        <p className="text-[12px] leading-4 text-gray-600 font-semibold line-clamp-1">
          Hi, {data?.fullName || "Guest"}
        </p>

        <div className="w-full h-full min-w-8 max-w-8 min-h-8 max-h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <img
            src={PermIdentity24pxWhiteIcon}
            alt="Person icon"
            className="w-full h-full min-w-6 max-w-6 min-h-6 max-h-6"
          />
        </div>
      </div>
    </header>
  );
}

export default AppBar;
