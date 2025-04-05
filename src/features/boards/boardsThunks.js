import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchBoardsAPI,
  deleteBoardAPI,
  fetchBoardDetailsAPI,
  createNewBoardAPI
} from '~/apis'

export const createNewBoard = createAsyncThunk('/board/createNewBoard', async (board) => {
  return await createNewBoardAPI(board)
})

export const deleteBoard = createAsyncThunk('/board/deleteBoard', async (boardId) => {
  await deleteBoardAPI(boardId)
  return { boardId }
})

export const fetchBoards = createAsyncThunk('/board/fetchBoards', async () => {
  return await fetchBoardsAPI()
})

export const fetchBoardDetails = createAsyncThunk('board/fetchColumns', async (boardId) => {
  return await fetchBoardDetailsAPI(boardId)
})
