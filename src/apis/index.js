import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardsAPI = async () => {
  const response = await axios.get(`${API_ROOT}/v1/boards`)
  return response.data?.metadata?.boards
}

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data?.metadata?.board
}

export const updateBoardAPI = async (boardId, updateData) => {
  const response = await axios.patch(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data?.metadata?.board
}

export const createNewColumnAPI = async (column) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, column)
  return response.data?.metadata?.column
}

export const updateColumnAPI = async (columnId, updateData) => {
  const response = await axios.patch(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data?.metadata?.column
}

export const moveCardToAnotherColumnAPI = async ({
  cardId,
  prevColumnId,
  cardOrderIdsOfPrevColumn,
  nextColumnId,
  cardOrderIdsOfNextColumn,
}) => {
  const response = await axios.patch(`${API_ROOT}/v1/columns/move-card-to-another-column`, {
    cardId,
    prevColumnId,
    cardOrderIdsOfPrevColumn,
    nextColumnId,
    cardOrderIdsOfNextColumn
  })
  return response.data?.metadata
}

export const deleteCardAPI = async (cardId) => {
  const response = await axios.delete(`${API_ROOT}/v1/cards/${cardId}`)
  return response.data?.metadata
}

export const deleteColumnAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data?.metadata
}

export const createNewCardAPI = async (card) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, card)
  return response.data?.metadata?.card
}
