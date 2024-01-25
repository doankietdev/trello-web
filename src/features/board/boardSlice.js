import { createSlice } from '@reduxjs/toolkit'
import { fetchBoardDetailsFulfilledReducer } from './boardReducers'
import { fetchBoardDetails } from './boardThunks'
import {
  pendingReducer,
  addNewColumnFulfilledReducer,
  deleteColumnFullfilledReducer,
  moveColumnsFulfilledReducer
} from './column/columnReducers'
import { addNewColumn, deleteColumn, moveColumns } from './column/columnThunks'
import {
  addNewCard,
  moveCardInSameColumn,
  moveCardInAnotherColumn
} from './column/card/cardThunks'
import {
  addNewCardFulfilledReducer,
  moveCardInSameColumnFulfilledReducer,
  moveCardInAnotherColumnFulfilledReducer
} from './column/card/cardReducers'

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    status: 'idle',
    board: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardDetails.pending, pendingReducer)
      .addCase(fetchBoardDetails.fulfilled, fetchBoardDetailsFulfilledReducer)
    builder
      .addCase(addNewColumn.pending, pendingReducer)
      .addCase(addNewColumn.fulfilled, addNewColumnFulfilledReducer)
      .addCase(deleteColumn.pending, pendingReducer)
      .addCase(deleteColumn.fulfilled, deleteColumnFullfilledReducer)
      .addCase(moveColumns.pending, pendingReducer)
      .addCase(moveColumns.fulfilled, moveColumnsFulfilledReducer)
    builder
      .addCase(addNewCard.pending, pendingReducer)
      .addCase(addNewCard.fulfilled, addNewCardFulfilledReducer)
      .addCase(moveCardInSameColumn.pending, pendingReducer)
      .addCase(moveCardInSameColumn.fulfilled, moveCardInSameColumnFulfilledReducer)
      .addCase(moveCardInAnotherColumn.pending, pendingReducer)
      .addCase(moveCardInAnotherColumn.fulfilled, moveCardInAnotherColumnFulfilledReducer)
  }
})

export default boardSlice.reducer
