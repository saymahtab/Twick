import { LogOut, Settings, User } from "lucide-react";
import React from "react";
import { Link } from "react-router";

function ProfileMenu({ setOpenProfileMenu }) {
  return (
    <ul className="dropdown-content menu bg-base-300 rounded-xl z-50 w-60 shadow-sm p-0 top-14 font-semibold">
      <li>
        <Link to='/profile' onClick={() => setOpenProfileMenu(prev => !prev)} className="py-3 px-4 rounded-t-2xl">
          <User />
          My Profile
        </Link>
      </li>
      <li>
        <Link to='/settings' onClick={() => setOpenProfileMenu(prev => !prev)} className="py-3 px-4">
          <Settings />
          Settings
        </Link>
      </li>
      <li className="text-red-500">
        <Link to='/login' onClick={() => setOpenProfileMenu(prev => !prev)} className="py-3 px-4 rounded-b-xl">
          <LogOut />
          Logout
        </Link>
      </li>
    </ul>
  );
}

export default ProfileMenu;
