import { Bookmark, Pencil, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { DeletePost } from "../features/posts/postSlice";

function DropDownMenu({ post, setOpenMenu, setSelectedPost }) {
  const dispatch = useDispatch();

  const handleDeletePost = () => {
    dispatch(DeletePost(post.id));
    setOpenMenu(false);
  };

  return (
    <ul className="dropdown-content menu bg-base-200 rounded-xl top-11 z-10 w-52 p-0 py-0 shadow-sm text-zinc-400">
      <li>
        <button className="btn btn-ghost justify-start gap-3 rounded-t-xl px-4 py-6">
          <Bookmark className="size-5" />
          Save Post
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            setSelectedPost(post);
          }}
          className="btn btn-ghost justify-start gap-3  rounded-none px-4 py-6"
        >
          <Pencil className="size-5" />
          Edit Post
        </button>
      </li>
      <li>
        <button
          onClick={handleDeletePost}
          className="btn btn-ghost justify-start gap-3  rounded-none text-red-500 rounded-b-xl px-4 py-6"
        >
          <Trash className="size-5" />
          Delete Post
        </button>
      </li>
    </ul>
  );
}

export default DropDownMenu;
