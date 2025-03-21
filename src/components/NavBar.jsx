import { Bell, EggFried, LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router";

function NavBar() {
  return (
    <div className="flex fixed z-50 items-center px-1 sm:px-2 py-2 justify-between bg-base-200 border-b border-base-300 w-full">
      <div className="flex items-center sm:ml-2 ml-1 cursor-pointer">
        <EggFried size={22} className="text-primary" />
        <Link className="btn bg-base-200 border-none shadow-none p-2 text-lg">
          Twick
        </Link>
      </div>
      <div className="flex items-center gap-2 sm:gap-6">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Bell size={24} />
            <span className="badge badge-primary rounded-2xl badge-xs indicator-item">
              0
            </span>
          </div>
        </button>
        <div className="dropdown dropdown-end mr-2 sm:mr-3">
          <button className="btn btn-ghost btn-circle avatar">
            <div className="w-14 rounded-full">
              <img
                src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                alt="Profile Pic"
              />
            </div>
          </button>
          <ul className="dropdown-content menu border border-base-200 bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li className="flex items-start gap-2">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                    alt="Profile Pic"
                  />
                </div>
                <div className="flex items-center">
                  <p className="font-bold">John Doe</p>
                  <span className="text-base-content/50">Admin</span>
                </div>
              </div>
            </li>
            <li>
              <Link className="py-3">
                <User />
                My Profile
              </Link>
            </li>
            <li>
              <Link className="py-3">
                <Settings />
                Settings
              </Link>
            </li>
            <li>
              <Link className="py-3">
                <LogOut />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
