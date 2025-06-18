import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { supabase } from '@/config/supabase'; // Uncomment and configure for real backend

// Example async thunk for fetching profile (replace with real API call)
export const fetchProfile = createAsyncThunk('profile/fetch', async (userId) => {
  // const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  // if (error) throw error;
  // return data;
  // Mock data for now:
  return {
    id: userId,
    full_name: 'Demo User',
    email: 'demo@example.com',
    bio: 'This is a demo bio.',
    birthday: '2000-01-01',
    avatar_url: '',
  };
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: { data: null, loading: false, error: null },
  reducers: {
    clearProfile: (state) => { state.data = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;