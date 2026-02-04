import { NavLink } from "react-router-dom";
import type { UserRole } from "../../domain/user/types";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logoutAccount } from "../store/auth/authThunk";
import { useNavigate } from "react-router-dom";
import AppLogo from "../assets/images/png/app_logo.png";
import Button from "../components/Button";

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
  const { loading } = useAppSelector((state) => state.auth.logout);
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
          className="fixed top-0 left-0 right-0 bottom-0 inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`w-full h-auto max-w-64 min-w-64 flex flex-col items-start justify-start fixed top-0 left-0 bottom-0 bg-white border-r border-gray-200 shadow-md z-40 transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="w-full h-auto min-h-23.75 max-h-23.75 flex items-center justify-center px-4 py-2">
          <img
            src={AppLogo}
            alt="App logo"
            className="w-50 h-auto object-contain object-center"
          />
        </div>

        <nav className="w-full h-full flex flex-col items-start justify-start max-h-[calc(100vh-(95px+68px))] overflow-y-auto gap-2 px-4 pt-2">
          {navList
            .filter(
              (item) =>
                data?.role && item.roles.includes(data.role as UserRole),
            )
            .map((item) => (
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `w-full h-auto px-4 py-2 text-left text-[14px] leading-5 font-bold rounded-lg focus:border-blue-500 ${isActive ? "bg-sky-500 text-white hover:bg-sky-600" : "bg-white hover:bg-gray-100"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
        </nav>

        <div className="w-full h-auto p-4 min-h-17 max-h-17">
          <Button
            type="danger"
            id="logoutButton"
            buttonType="button"
            label={loading ? "Loading..." : "Logout"}
            disabled={loading}
            onClick={handleLogout}
          />
        </div>
      </aside>
    </>
  );
}

export default SideBar;
