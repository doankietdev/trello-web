import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBoardsAPI, fetchBoardDetailsAPI, createNewBoardAPI } from '~/apis'

export const createNewBoard = createAsyncThunk('/board/createNewBoard', async (board) => {
  try {
    return await createNewBoardAPI(board)
  } catch (error) {
    console.log(error.message)
  }
})


export const fetchBoards = createAsyncThunk('/board/fetchBoards', async () => {
  try {
    return await fetchBoardsAPI()
  } catch (error) {
    console.log(error.message)
  }
})

export const fetchBoardDetails = createAsyncThunk('board/fetchColumns', async (boardId) => {
  // const boardId = '  '
  try {
    return await fetchBoardDetailsAPI(boardId)
  } catch (error) {
    console.log(error.message)
  }
})
