import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createNewCardAPI,
  updateColumnAPI,
  moveCardToAnotherColumnAPI,
  deleteCardAPI
} from '~/apis'
import { SUFFIX_PLACEHOLDER_CARD } from '~/utils/constants'

export const addNewCard = createAsyncThunk('board/addNewCard', async ({
  title,
  boardId,
  columnId
}) => {
  return await createNewCardAPI({ title, boardId, columnId })
})

export const moveCardInSameColumn = createAsyncThunk(
  'board/moveCardInSameColumn',
  async ({ columnId, newCards }) => {
    return await updateColumnAPI(columnId, {
      cardOrderIds: newCards?.map(card => card?._id)
    })
  }
)

export const moveCardInAnotherColumn = createAsyncThunk('board/moveCardInAnotherColumn', async ({
  cardId,
  prevColumnId,
  newCardsOfPrevColumn,
  nextColumnId,
  newCardsOfNextColumn
}) => {
  let cardOrderIdsOfPrevColumn = newCardsOfPrevColumn.map(card => card?._id)
  const cardOrderIdsOfNextColumn = newCardsOfNextColumn.map(card => card?._id)
  if (cardOrderIdsOfPrevColumn[0]?.includes(SUFFIX_PLACEHOLDER_CARD)) {
    cardOrderIdsOfPrevColumn = []
  }

  await moveCardToAnotherColumnAPI({
    cardId,
    prevColumnId,
    cardOrderIdsOfPrevColumn,
    nextColumnId,
    cardOrderIdsOfNextColumn
  })

  return {
    prevColumnId,
    newCardsOfPrevColumn,
    nextColumnId,
    newCardsOfNextColumn
  }
})

export const deleteCard = createAsyncThunk('board/deleteCard', async (card) => {
  await deleteCardAPI(card?._id)
  return card
})
