import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const postSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    AddPost: (state, action) => {
      state.push({
        id: uuid(),
        text: action.payload.text,
        image: action.payload.image,
        createdAt: Date.now(),
      });
    },
    DeletePost: (state, action) => {
      return state.filter(post => post.id !== action.payload);
    },
    EditPost: (state, action) => {
      const {newText, id} = action.payload;
      const post = state.find(post => post.id === id);
      post.text = newText;
    }
  }
});

export const { AddPost, DeletePost, EditPost } = postSlice.actions;
export default postSlice.reducer;
