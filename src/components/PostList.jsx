import { useSelector } from "react-redux";
import Post from "./Post";
import { useMemo } from "react";

function PostList({ textareaRef }) {
  const posts = useSelector((state) => state.posts);

  const memoizedPosts = useMemo(() => {
    return [...posts].sort((a, b) => b.createdAt - a.createdAt)
  })

  const handleCreatePost = () => {
    textareaRef.current.focus();
  };

  return (
    <div className="w-full">
      {posts.length > 0 ? (
        memoizedPosts.map((post, index) => <Post key={index} post={post} />)
      ) : (
        <div className="bg-base-200 flex flex-col items-center justify-center h-[calc(100vh-13.3rem)] rounded-md mt-2 w-[calc(100vw-14px)] sm:w-full max-w-screen-sm mx-auto text-white/50 p-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-white/30 mb-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16 3h5v5" />
            <path d="M4 11V4a1 1 0 0 1 1-1h7" />
            <path d="M20 16v4a1 1 0 0 1-1 1h-4" />
            <path d="m4 22 10-10" />
            <path d="m9 12 3 3" />
          </svg>

          <h2 className="text-lg font-semibold text-white">No Posts Yet</h2>
          <p className="text-sm text-white/50 mb-4">
            Start sharing your thoughts with a new post.
          </p>

          <button
            onClick={handleCreatePost}
            className="btn btn-primary px-4 py-2 rounded-md text-white"
          >
            Create a Post
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;
