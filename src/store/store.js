import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";

const loadFromLocalStorage = () => {
  try {
    const storedPosts = localStorage.getItem("posts");
    return storedPosts ? { posts: JSON.parse(storedPosts) } : { posts: [] };
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return { posts: [] };
  }
};

const saveToLocalStorage = (posts) => {
  try {
    localStorage.setItem("posts", JSON.stringify(posts.posts)); 
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const preloadedState = loadFromLocalStorage(); 

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
