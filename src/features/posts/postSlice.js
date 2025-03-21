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
    }
  }
});

export const { AddPost, DeletePost } = postSlice.actions;
export default postSlice.reducer;
