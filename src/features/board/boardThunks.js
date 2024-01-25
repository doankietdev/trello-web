import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBoardDetailsAPI } from '~/apis'

export const fetchBoardDetails = createAsyncThunk('board/fetchColumns', async () => {
  const boardId = '65a2f9773f5655539e391e92'
  try {
    return await fetchBoardDetailsAPI(boardId)
  } catch (error) {
    console.log(error.message)
  }
})
