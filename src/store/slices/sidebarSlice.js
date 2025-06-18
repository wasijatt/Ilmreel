import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true,
  activeItem: 'For You',
  isMobile: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
    setMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export const { toggleSidebar, setActiveItem, setMobile } = sidebarSlice.actions;
export default sidebarSlice.reducer; 