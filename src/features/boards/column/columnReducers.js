import { generatePlaceholderCard } from '~/utils/formatter'

export const pendingReducer = (state, action) => {
  state.status = 'loading'
}

export const addNewColumnFulfilledReducer = (state, action) => {
  state.status = 'idle'

  const placeholderCard = generatePlaceholderCard(state?._id, action.payload?._id)
  state.currentBoard.columns.push({
    ...action.payload,
    cards: [placeholderCard],
    cardOrderIds: [placeholderCard?._id]
  })
  state.currentBoard.columnOrderIds.push(action?._id)
}

export const deleteColumnFullfilledReducer = (state, action) => {
  state.status = 'idle'

  state.currentBoard.columns = state.currentBoard?.columns
    ?.filter(column => column?._id !== action.payload?.columnId)
  state.currentBoard.columnOrderIds = state.currentBoard?.columnOrderIds
    ?.filter(columnOrderId => columnOrderId !== action.payload?.columnId)
}

export const moveColumnsFulfilledReducer = (state, action) => {
  state.currentBoard.columns = action.payload?.newColumns
  state.currentBoard.columnOrderIds = action.payload?.newColumnOrderIds
}
