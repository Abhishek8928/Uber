import { createSlice } from "@reduxjs/toolkit";


const userSliceConfig = createSlice({
  name: "user",
  initialState:{
    data:null,
    role:null,
  },
  reducers: {
    // Adds user data to the state
    addUser: (state, action) => {
      state.data = action.payload;
      state.role = action.payload.role;
    },
    // Removes the user by resetting the state
    removeUser: (state) => {
      // Resets user state to its initial state
      state.name = '';
      state.email = '';
      state.loggedIn = false;
    },
  },
});

// Export the actions so that you can dispatch them in your components
export const { addUser, removeUser } = userSliceConfig.actions;

// Export the reducer to be used in the store
export default userSliceConfig.reducer;
