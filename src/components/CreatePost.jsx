import {
  CalendarCheck2,
  Image,
  List,
  MapPinPlus,
  Smile,
  Sticker,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useDispatch } from "react-redux";
import { AddPost } from "../features/posts/postSlice";

function CreatePost({ textareaRef }) {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const dispatch = useDispatch();

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setText(e.target.value);
  };

  //close emoji picker if user click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.body.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
    }
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handlePost = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    dispatch(AddPost({ text, image: selectedImage }));
    setText("");
    setSelectedImage(null);
  };

  return (
    <div className="flex gap-2 bg-base-200 py-5 px-4 rounded-md mt-16 w-[calc(100vw-14px)] sm:w-full max-w-screen-sm mx-auto border-base-content/20">
      <div className="avatar items-start btn btn-ghost btn-circle w-12">
        <div className="w-11 rounded-full hover:opacity-80 transition duration-300">
          <img
            src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
            alt="User"
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="border-b border-base-content/10">
          <textarea
            ref={textareaRef}
            className="bg-base-200 w-full resize-none focus:outline-none text-xl p-1 my-1 overflow-hidden"
            rows="1"
            placeholder="Create a Post!"
            value={text}
            onChange={handleInput}
          ></textarea>

          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Post-Image"
                className="w-full h-full rounded-2xl mb-3"
              />
              <span className="badge badge-xl rounded-2xl text-sm font-semibold absolute top-1 left-1 border-0 bg-base-300/80 cursor-pointer hover:bg-base-300/70 transition duration-300">
                Edit
              </span>
              <X
                onClick={() => setSelectedImage(null)}
                className="rounded-full p-2 size-8 font-semibold absolute top-1 right-1 border-0 bg-base-300/80 cursor-pointer hover:bg-base-300/70 transition duration-300"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex-1">
            <button
              onClick={handleImageClick}
              className="btn btn-ghost btn-circle h-9 w-9 hover:bg-primary/5"
            >
              <Image size={18} className="text-primary" />
            </button>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowEmojiPicker((prev) => !prev);
              }}
              className="btn btn-ghost btn-circle h-9 w-9 hover:bg-primary/5"
            >
              <Smile size={18} className="text-primary" />
            </button>
            {showEmojiPicker && (
              <div ref={emojiPickerRef} className="absolute bottom-24">
                <EmojiPicker
                  className="z-50"
                  onEmojiClick={handleEmojiClick}
                  theme="dark"
                />
              </div>
            )}
            <button className="btn btn-ghost btn-circle h-9 w-9 hover:bg-primary/5">
              <Sticker size={18} className="text-primary" />
            </button>
            <button className="btn btn-ghost btn-circle h-9 w-9 hover:bg-primary/5">
              <List size={18} className="text-primary" />
            </button>
            <button className="btn btn-ghost btn-circle h-9 w-9 hover:bg-primary/5 hidden sm:inline-flex">
              <CalendarCheck2 size={18} className="text-primary" />
            </button>
            <button className="btn btn-ghost btn-circle h-9 w-9 hover:bg-primary/5 hidden sm:inline-flex">
              <MapPinPlus size={18} className="text-primary" />
            </button>
          </div>
          <div className="w-20">
            <button
              onClick={handlePost}
              disabled={text.length <= 0 && !selectedImage}
              className="btn btn-primary rounded-full btn-block"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
