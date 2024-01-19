import axios from 'axios'
import { API_ROOT } from '~/utils/constants'


export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const createNewColumnAPI = async (column) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, column)
  return response.data?.metadata?.column
}

export const createNewCardAPI = async (card) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, card)
  return response.data?.metadata?.card
}
