import { generatePlaceholderCard } from '~/utils/formatter'

export const pendingReducer = (state, action) => {
  state.status = 'loading'
}

export const addNewColumnFulfilledReducer = (state, action) => {
  state.status = 'idle'

  const placeholderCard = generatePlaceholderCard(state?._id, action.payload?._id)
  state.board.columns.push({
    ...action.payload,
    cards: [placeholderCard],
    cardOrderIds: [placeholderCard?._id]
  })
  state.board.columnOrderIds.push(action?._id)
}

export const deleteColumnFullfilledReducer = (state, action) => {
  state.status = 'idle'

  state.board.columns = state.board?.columns
    ?.filter(column => column?._id !== action.payload?.columnId)
  state.board.columnOrderIds = state.board?.columnOrderIds
    ?.filter(columnOrderId => columnOrderId !== action.payload?.columnId)
}

export const moveColumnsFulfilledReducer = (state, action) => {
  state.board.columns = action.payload?.newColumns
  state.board.columnOrderIds = action.payload?.newColumnOrderIds
}
