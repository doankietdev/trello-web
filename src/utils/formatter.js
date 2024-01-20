import { SUFFIX_PLACEHOLDER_CARD } from './constants'

export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export const generatePlaceholderCard = (boardId, columnId) => {
  return {
    _id: `${columnId}${SUFFIX_PLACEHOLDER_CARD}`,
    boardId,
    columnId,
    FE_PlaceholderCard: true
  }
}
