import { configureStore } from '@reduxjs/toolkit'
import boardReducer from '~/features/board/boardSlice'

const store = configureStore({
  reducer: {
    board: boardReducer
  }
})

export default store
