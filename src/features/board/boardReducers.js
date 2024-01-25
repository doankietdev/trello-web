import { generatePlaceholderCard } from '~/utils/formatter'
import { mapOrder } from '~/utils/sorts'

export const fetchBoardDetailsFulfilledReducer = (state, action) => {
  state.status = 'idle'

  state.board = action.payload
  state.board.columns = mapOrder(state.board?.columns, state.board?.columnOrderIds, '_id')
  state.board?.columns?.forEach(column => {
    if (!column?.cards?.length) {
      column.cards = [generatePlaceholderCard(state.board?._id, column?._id)]
      column.cardOrderIds = [column.cards[0]?._id]
      return
    }
    column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  })
}
