import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '@/config/supabase';

export const fetchVideos = createAsyncThunk('forYou/fetchVideos', async (_, thunkAPI) => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) throw error;
  return data;
});

const forYouSlice = createSlice({
  name: 'forYou',
  initialState: { videos: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => { state.loading = true; })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default forYouSlice.reducer;
