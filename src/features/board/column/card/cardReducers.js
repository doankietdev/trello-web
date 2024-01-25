import { mapOrder } from '~/utils/sorts'

export const addNewCardFulfilledReducer = (state, action) => {
  const foundColumn = state.board?.columns?.find(column =>
    column?._id === action.payload?.columnId
  )
  if (foundColumn) {
    foundColumn?.cards?.push(action.payload)
    foundColumn?.cardOrderIds?.push(action.payload?._id)
  }
}

export const moveCardInSameColumnFulfilledReducer = (state, action) => {
  const foundColumn = state.board?.columns?.find(
    column => column?._id === action.payload?._id
  )

  if (foundColumn) {
    foundColumn.cards = mapOrder(foundColumn.cards, action.payload?.cardOrderIds, '_id')
    foundColumn.cardOrderIds = action.payload?.cardOrderIds
  }
}

export const moveCardInAnotherColumnFulfilledReducer = (state, action) => {
  const {
    prevColumnId = '',
    newCardsOfPrevColumn = [],
    nextColumnId = '',
    newCardsOfNextColumn = []
  } = action.payload

  const prevColumn = state.board?.columns?.find(column => column?._id === prevColumnId)
  const nextColumn = state.board?.columns?.find(column => column?._id === nextColumnId)
  if (prevColumn) {
    prevColumn.cards = newCardsOfPrevColumn
    prevColumn.cardOrderIds = newCardsOfPrevColumn?.map(card => card?._id)
  }
  if (nextColumn) {
    nextColumn.cards = newCardsOfNextColumn
    nextColumn.cardOrderIds = newCardsOfNextColumn?.map(card => card?._id)
  }
}
