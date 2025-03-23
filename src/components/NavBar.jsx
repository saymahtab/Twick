import { Bell, EggFried } from "lucide-react";
import { Link } from "react-router";
import ProfileMenu from "./ProfileMenu";
import { useEffect, useRef, useState } from "react";

function NavBar() {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  // close menu if click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setOpenProfileMenu(false);
      }
    }

    if (openProfileMenu) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openProfileMenu]);

  return (
    <div className="flex fixed z-50 items-center px-1 sm:px-2 py-2 justify-between bg-base-300 w-full shadow-sm">
      <div className="flex items-center sm:ml-2 ml-1 cursor-pointer">
        {/* logo  */}
        <Link to="/">
          <button className="btn bg-base-300 border-none shadow-none p-2 text-lg">
            <EggFried size={25} className="text-primary" />
            Twick
          </button>
        </Link>
      </div>
      {/* notification button  */}
      <div className="flex items-center gap-1 sm:gap-6">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Bell size={24} />
            <span className="badge badge-primary rounded-2xl badge-xs indicator-item">
              0
            </span>
          </div>
        </button>
        {/* profile button  */}
        <div
          className="dropdown dropdown-end mr-3 ml-2 sm:ml-0"
          ref={profileMenuRef}
        >
          <button
            onClick={(e) => {
              e.stopPropagation(); //prevents Event Bubbling
              setOpenProfileMenu((prev) => !prev);
            }}
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-14 rounded-full">
              <img
                src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                alt="Profile Pic"
              />
            </div>
          </button>
          {/* dropdown menu  */}
          {openProfileMenu && (
            <ProfileMenu setOpenProfileMenu={setOpenProfileMenu} />
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
