import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBoardsAPI, fetchBoardDetailsAPI } from '~/apis'

export const fetchBoards = createAsyncThunk('/board/fetchBoards', async () => {
  try {
    return await fetchBoardsAPI()
  } catch (error) {
    console.log(error.message)
  }
})

export const fetchBoardDetails = createAsyncThunk('board/fetchColumns', async (boardId) => {
  // const boardId = '65a2f9773f5655539e391e92'
  try {
    return await fetchBoardDetailsAPI(boardId)
  } catch (error) {
    console.log(error.message)
  }
})
