import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createNewColumnAPI,
  deleteColumnAPI,
  updateBoardAPI
} from '~/apis'

export const addNewColumn = createAsyncThunk('board/createNewColumn', async ({ title, boardId }) => {
  const responseColumn = await createNewColumnAPI({ title, boardId })
  return responseColumn
})

export const deleteColumn = createAsyncThunk('board/deleteColumn', async ({ columnId }) => {
  await deleteColumnAPI(columnId)
  return { columnId }
})

export const moveColumns = createAsyncThunk('board/moveColumns', async ({ boardId, newColumns }) => {
  const newColumnOrderIds = newColumns.map(column => column?._id)
  await updateBoardAPI(boardId, { columnOrderIds: newColumnOrderIds })
  return { newColumnOrderIds, newColumns }
})
