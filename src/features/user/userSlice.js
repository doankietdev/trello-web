import { createSlice } from '@reduxjs/toolkit'
import { login } from './userThunk'

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    currentUser: null
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

export default userSlice.reducer
