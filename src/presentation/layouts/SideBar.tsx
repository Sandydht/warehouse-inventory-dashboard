import { Link } from "react-router-dom";
import type { UserRole } from "../../domain/user/types";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logoutAccount } from "../store/auth/authThunk";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface SideBarItemData {
  label: string;
  link: string;
  roles: UserRole[];
}

function SideBar({ isOpen, onClose }: SidebarProps) {
  const { data } = useAppSelector((state) => state.user.userProfile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navList: SideBarItemData[] = [
    {
      label: "Dashboard",
      link: "/dashboard",
      roles: ["OFFICER", "STAFF"],
    },
    {
      label: "My Task",
      link: "/my-task",
      roles: ["OFFICER"],
    },
    {
      label: "Inventory List",
      link: "/inventory-list",
      roles: ["OFFICER", "STAFF"],
    },
  ];

  const handleLogout = async () => {
    try {
      await dispatch(logoutAccount()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
          {navList
            .filter(
              (item) =>
                data?.role && item.roles.includes(data.role as UserRole),
            )
            .map((item) => (
              <SidebarItem
                key={item.label}
                label={item.label}
                link={item.link}
              />
            ))}

          <button
            type="button"
            className="text-left px-3 py-2 rounded cursor-pointer hover:bg-gray-100 text-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}

function SidebarItem({ label, link }: { label: string; link: string }) {
  return (
    <Link
      to={link}
      className="text-left px-3 py-2 rounded cursor-pointer hover:bg-gray-100 text-sm"
    >
      {label}
    </Link>
  );
}

export default SideBar;
