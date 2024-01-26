import { generatePlaceholderCard } from '~/utils/formatter'
import { mapOrder } from '~/utils/sorts'

export const createNewBoardFulfilledReducer = (state, action) => {
  state.boards.push(action.payload)
}

export const deleteBoardFulfilledReducer = (state, action) => {
  state.boards = state.boards.filter(board => board?._id !== action.payload?.boardId)
}

export const fetchBoardsFulfilledReducer = (state, action) => {
  state.boards = action.payload
}

export const fetchBoardDetailsFulfilledReducer = (state, action) => {
  state.status = 'idle'

  state.currentBoard = action.payload
  state.currentBoard.columns = mapOrder(
    state.currentBoard?.columns,
    state.currentBoard?.columnOrderIds,
    '_id'
  )
  state.currentBoard?.columns?.forEach((column) => {
    if (!column?.cards?.length) {
      column.cards = [
        generatePlaceholderCard(state.currentBoard?._id, column?._id)
      ]
      column.cardOrderIds = [column.cards[0]?._id]
      return
    }
    column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  })
}
