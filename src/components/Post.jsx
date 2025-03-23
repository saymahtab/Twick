import {
  ArrowUpToLine,
  Ellipsis,
  Heart,
  MessageCircle,
  Share,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DropDownMenu from "./DropDownMenu";
import EditModel from "./EditModel";

function Post({ post }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const dropdownRef = useRef(null);

  // Close Menu when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength || expanded) return text;
    return text.slice(0, maxLength).trim() + " …";
  };
  

  return (
    <div className="flex flex-col relative gap-2 bg-base-300 mb-2 rounded-md mt-2 w-[calc(100vw-14px)] sm:w-full max-w-xl mx-auto">
      <div className="flex gap-2 mx-4 mt-5">
        <div className="avatar items-start btn btn-ghost btn-circle w-12">
          <div className="w-11 rounded-full hover:opacity-80 transition duration-300">
            <img
              src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
              alt="User"
            />
          </div>
        </div>
        <div className="flex flex-1 items-start flex-col cursor-pointer">
          <div className="flex flex-col items-start">
            <p className="font-bold flex items-center gap-2 hover:underline decoration-1">
              John Doe
              <ShieldCheck size={18} className="text-primary" />
            </p>
            <span className="text-base-content/50 text-sm">@johndoe</span>
          </div>
        </div>
        {/* menu  */}
        <div
          ref={dropdownRef}
          className="dropdown dropdown-end absolute top-1 right-1"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu((prev) => !prev);
            }}
            className="btn btn-ghost btn-circle"
          >
            <Ellipsis className="size-6 text-gray-400" />
          </button>
          {openMenu && (
            <DropDownMenu
              setOpenMenu={setOpenMenu}
              post={post}
              setSelectedPost={setSelectedPost}
            />
          )}
        </div>
      </div>

      {/* post text and image  */}
      <div className="flex flex-col mx-4">
        <p className="text-md relative break-words whitespace-pre-wrap">
          {truncateText(post.text, 130)}
          {post.text.length > 130 && (
            <span
              onClick={() => setExpanded((prev) => !prev)}
              className="text-white/50 cursor-pointer hover:underline decoration-1"
            >
              {expanded ? " Show less" : "more"}
            </span>
          )}
        </p>
        {post.image && (
          <div className="mt-4 w-full flex justify-center">
            <img
              src={post.image}
              alt="post"
              className="rounded-xl h-auto object-contain"
            />
          </div>
        )}
      </div>

      {/* social buttons  */}
      <div className="flex items-center border-t border-white/10 mt-2 text-white/40">
        <button className="flex-1 text-sm btn rounded-none btn-ghost hover:text-pink-500">
          <Heart className="size-4 xs:size-5" />
          15k
        </button>
        <button className="flex-1 text-sm btn rounded-none btn-ghost hover:text-blue-500">
          <ArrowUpToLine className="size-4 xs:size-5" />
          200
        </button>
        <button className="flex-1 text-sm btn rounded-none btn-ghost hover:text-green-500">
          <MessageCircle className="size-4 xs:size-5" />
          10k
        </button>
        <button className="flex-1 text-sm btn rounded-none btn-ghost hover:text-white/60">
          <Share className="size-4 xs:size-5" />
          100
        </button>
      </div>

      {/* Edit Post Modal */}
      {selectedPost && (
        <EditModel
          setSelectedPost={setSelectedPost}
          selectedPost={selectedPost}
          post={post}
        />
      )}
    </div>
  );
}

export default Post;
