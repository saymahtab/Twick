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
  const [pickerPosition, setPickerPosition] = useState("bottom");

  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const dispatch = useDispatch();

  const handleInput = (e) => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    setText(e.target.value);
  };

  // Close emoji picker if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageClick = () => {
    if (!selectedImage) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        e.target.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiSelect = (emojiData) => {
    setText((prevText) => prevText + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleEmojiButtonClick = (e) => {
    e.stopPropagation();
    setShowEmojiPicker((prev) => !prev);

    const buttonRect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    setPickerPosition(spaceBelow < 250 ? "top" : "bottom");
  };

  const handlePost = () => {
    dispatch(AddPost({ text, image: selectedImage }));
    setText("");
    setSelectedImage(null);
    textareaRef.current.style.height = "auto";
  };

  return (
    <div className="flex gap-2 bg-base-300 py-5 px-4 rounded-md mt-16 w-[calc(100vw-14px)] sm:w-full max-w-xl mx-auto border-base-content/20">
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
            className="bg-base-300 w-full resize-none focus:outline-none text-xl p-1 my-1 overflow-hidden"
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
              className="btn btn-ghost btn-circle h-9 w-9 hover:bg-primary/5 hover:border-none border-none"
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
              ref={emojiPickerRef}
              onClick={handleEmojiButtonClick}
              className="btn btn-ghost btn-circle h-9 w-9 hover:bg-primary/5 hover:border-none border-none"
            >
              <Smile size={18} className="text-primary" />
            </button>
            {showEmojiPicker && (
              <div
                className={`absolute z-50 ${
                  pickerPosition === "top" ? "top-18" : ""
                }`}
              >
                <EmojiPicker theme="dark" onEmojiClick={handleEmojiSelect} />
              </div>
            )}
            <button className="btn btn-ghost btn-circle h-9 w-9 hover:bg-primary/5 hover:border-none border-none">
              <Sticker size={18} className="text-primary" />
            </button>
            <button className="btn btn-ghost btn-circle h-9 w-9 hover:bg-primary/5 hover:border-none border-none">
              <List size={18} className="text-primary" />
            </button>
            <button className="btn btn-ghost btn-circle h-9 w-9 hover:bg-primary/5 hidden sm:inline-flex hover:border-none border-none">
              <CalendarCheck2 size={18} className="text-primary" />
            </button>
            <button className="btn btn-ghost btn-circle h-9 w-9 hover:bg-primary/5 hidden sm:inline-flex hover:border-none border-none">
              <MapPinPlus size={18} className="text-primary" />
            </button>
          </div>
          <div className="w-20">
            <button
              onClick={handlePost}
              disabled={!text.trim() && !selectedImage}
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
