import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sidebarSlice';
import authReducer from './slices/authSlice';
import videoUploadReducer from './slices/videoUploadSlice';
import profileReducer from './slices/profileSlice';
import forYouReducer from './slices/forYouSlice'
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
    videoUpload: videoUploadReducer,
    profile: profileReducer,
    forYou:forYouReducer
  },
}); 


import { createSlice } from '@reduxjs/toolkit';

const videoUploadSlice = createSlice({
  name: 'videoUpload',
  initialState: { file: null, progress: 0, uploading: false, error: null },
  reducers: {
    setFile: (state, action) => { state.file = action.payload; },
    setProgress: (state, action) => { state.progress = action.payload; },
    setUploading: (state, action) => { state.uploading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
    clearUpload: (state) => { state.file = null; state.progress = 0; state.uploading = false; state.error = null; }
  }
});
export const { setFile, setProgress, setUploading, setError, clearUpload } = videoUploadSlice.actions;
export default videoUploadSlice.reducer;

