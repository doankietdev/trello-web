import { createSlice } from '@reduxjs/toolkit'
import {
  createNewBoardFulfilledReducer,
  deleteBoardFulfilledReducer,
  fetchBoardDetailsFulfilledReducer,
  fetchBoardsFulfilledReducer
} from './boardsReducers'
import {
  createNewBoard,
  deleteBoard,
  fetchBoardDetails,
  fetchBoards
} from './boardsThunks'
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
  moveCardInAnotherColumn,
  deleteCard
} from './column/card/cardThunks'
import {
  addNewCardFulfilledReducer,
  moveCardInSameColumnFulfilledReducer,
  moveCardInAnotherColumnFulfilledReducer,
  deleteCardFulfilledReducer
} from './column/card/cardReducers'

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    status: 'idle',
    boards: [],
    currentBoard: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewBoard.pending, pendingReducer)
      .addCase(createNewBoard.fulfilled, createNewBoardFulfilledReducer)
      .addCase(deleteBoard.pending, pendingReducer)
      .addCase(deleteBoard.fulfilled, deleteBoardFulfilledReducer)
      .addCase(fetchBoards.pending, pendingReducer)
      .addCase(fetchBoards.fulfilled, fetchBoardsFulfilledReducer)
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
      .addCase(deleteCard.pending, pendingReducer)
      .addCase(deleteCard.fulfilled, deleteCardFulfilledReducer)
  }
})

export default boardSlice.reducer
