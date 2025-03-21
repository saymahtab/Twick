import { useRef } from "react";
import CreatePost from "./components/CreatePost";
import NavBar from "./components/NavBar";
import PostList from "./components/PostList";

function App() {

  const textareaRef = useRef(null);
  
  return (
    <div className="flex w-full h-screen flex-col items-center">
      <NavBar />
      <CreatePost textareaRef={textareaRef} />
      <PostList textareaRef={textareaRef} />
    </div>
  );
}

export default App;
