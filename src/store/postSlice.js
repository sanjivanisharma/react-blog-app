import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPostsStore: (state, action) => {
            state.posts = action.payload.documents
        },
        createPostStore: (state, action) => {
            state.posts.push(action.payload.post)
        },
        updatePostStore: (state, action) => {
            state.posts = state.posts.map(singlePost => (
                singlePost.$id === action.payload.post.$id ? action.payload.post : singlePost
            ))
        },
        deletePostStore: (state, action) => {
            state.posts = state.posts.filter(singlePost => singlePost.$id !== action.payload.postId)
        }
    }
})

export const { setPostsStore, createPostStore, updatePostStore, deletePostStore } = postSlice.actions;

export default postSlice.reducer;