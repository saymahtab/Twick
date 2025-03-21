import {
  ArrowUpToLine,
  Ellipsis,
  Heart,
  MessageCircle,
  Share,
  ShieldCheck,
  Smile,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DropDownMenu from "./DropDownMenu";

function Post({ post }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [editText, setEditText] = useState(post.text);
  const [selectedPost, setSelectedPost] = useState(null);

  const dropdownRef = useRef(null);
  const textareaRef = useRef(null);

  const handleEditInput = (e) => {
    setEditText(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (selectedPost) {
      const modal = document.getElementById("my_modal_2");
      if (modal) {
        modal.showModal();
      }
      setEditText(selectedPost.text);
      setTimeout(adjustTextareaHeight, 0); // Ensure height updates after DOM update
    }
  }, [selectedPost]);

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

  return (
    <div className="flex flex-col relative gap-2 bg-base-200 mb-2 rounded-md mt-2 w-[calc(100vw-14px)] sm:w-full max-w-screen-sm mx-auto">
      <div className="flex gap-2 mx-4 mt-5">
        <div className="avatar items-start btn btn-ghost btn-circle w-12">
          <div className="w-11 rounded-full hover:opacity-80 transition duration-300">
            <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="User" />
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
        <div ref={dropdownRef} className="dropdown dropdown-end absolute top-1 right-1">
          <button onClick={() => setOpenMenu(!openMenu)} className="btn btn-ghost btn-circle">
            <Ellipsis className="size-6 text-gray-400" />
          </button>
          {openMenu && <DropDownMenu setOpenMenu={setOpenMenu} post={post} setSelectedPost={setSelectedPost} />}
        </div>
      </div>

      <div className="flex flex-col mx-4">
        <p>{post.text}</p>
        {post.image && (
          <div className="mt-4 w-full flex justify-center">
            <img src={post.image} alt="post" className="rounded-xl h-auto object-contain" />
          </div>
        )}
      </div>

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
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box w-11/12 max-w-2xl bg-base-200">
            <div className="flex flex-col gap-2 items-center">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="user" />
                    </div>
                  </div>
                  <div className="flex flex-col cursor-default">
                    <p className="font-bold">John Doe</p>
                    <span className="text-sm text-white/50">Post to Everyone</span>
                  </div>
                </div>
                <form method="dialog">
                  <button className="btn btn-ghost btn-circle" onClick={() => setSelectedPost(null)}>
                    <X />
                  </button>
                </form>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-start w-full mt-10">
              <div className="overflow-y-auto h-[calc(100vh-20rem)] w-full">
                <textarea
                  ref={textareaRef}
                  className="bg-base-100 w-full resize-none focus:outline-none text-xl p-1 my-1 overflow-hidden"
                  rows="1"
                  value={editText}
                  onChange={handleEditInput}
                ></textarea>
                {selectedPost.image && (
                  <div className="relative">
                    <img src={selectedPost.image} alt="Post-Image" className="w-full h-full rounded-2xl mb-3" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 border-t border-white/10 pt-3">
                <button className="btn btn-ghost btn-circle">
                  <Smile size={18} className="text-primary" />
                </button>
                <button
                disabled={editText === post.text}
                 className="btn btn-primary">
                  Save
                </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedPost(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default Post;
