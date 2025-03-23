import { Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { EditPost } from "../features/posts/postSlice";

function EditModel({ post, setSelectedPost, selectedPost }) {
  const [editText, setEditText] = useState(post.text);
  const textareaRef = useRef(null);
  const dispatch = useDispatch();

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
      const length = textareaRef.current.value.length;
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [selectedPost]);

  useEffect(() => {
    if (selectedPost) {
      const modal = document.getElementById("my_modal_2");
      if (modal) {
        modal.showModal();
      }
      setEditText(selectedPost.text);
      setTimeout(adjustTextareaHeight, 0);
    }
  }, [selectedPost]);

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(EditPost({ id: post.id, newText: editText }));
      setSelectedPost(null);
    }
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box w-11/12 max-w-2xl bg-base-200 rounded-xl">
        <div className="flex flex-col gap-2 items-center">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img
                    src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                    alt="user"
                  />
                </div>
              </div>
              <div className="flex flex-col cursor-default">
                <p className="font-bold">John Doe</p>
                <span className="text-sm text-white/50">Post to Everyone</span>
              </div>
            </div>
            <form method="dialog">
              <button
                className="btn btn-ghost btn-circle"
                onClick={() => setSelectedPost(null)}
              >
                <X />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start w-full mt-10">
          <div className="overflow-y-auto h-[calc(100vh-20rem)] w-full">
            <textarea
              ref={textareaRef}
              className="bg-base-200 w-full resize-none focus:outline-none text-xl p-1 my-1 overflow-hidden"
              rows="1"
              value={editText}
              onChange={handleEditInput}
            ></textarea>
            {selectedPost.image && (
              <div className="relative">
                <img
                  src={selectedPost.image}
                  alt="Post-Image"
                  className="w-full h-full rounded-2xl mb-3"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 border-t border-white/10 pt-3">
          <button className="btn btn-ghost btn-circle">
            <Smile size={18} className="text-primary" />
          </button>
          <button
            onClick={handleSave}
            disabled={editText === post.text || editText === ""}
            className="btn btn-primary rounded-full px-8"
          >
            Save
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setSelectedPost(null)}>close</button>
      </form>
    </dialog>
  );
}

export default EditModel;
