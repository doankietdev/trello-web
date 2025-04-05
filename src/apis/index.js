import { authorizedAxiosInstance } from '~/utils/axios'

export const createNewBoardAPI = async (board) => {
  const response = await authorizedAxiosInstance.post('/boards', board)
  return response.data?.metadata?.board
}

export const deleteBoardAPI = async (boardId) => {
  const response = await authorizedAxiosInstance.delete(`/boards/${boardId}`)
  return response.data?.metadata?.board
}

export const fetchBoardsAPI = async () => {
  const response = await authorizedAxiosInstance.get('/boards')
  return response.data?.metadata?.boards
}

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await authorizedAxiosInstance.get(`/boards/${boardId}`)
  return response.data?.metadata?.board
}

export const updateBoardAPI = async (boardId, updateData) => {
  const response = await authorizedAxiosInstance.patch(`/boards/${boardId}`, updateData)
  return response.data?.metadata?.board
}

export const createNewColumnAPI = async (column) => {
  const response = await authorizedAxiosInstance.post('/columns', column)
  return response.data?.metadata?.column
}

export const updateColumnAPI = async (columnId, updateData) => {
  const response = await authorizedAxiosInstance.patch(`/columns/${columnId}`, updateData)
  return response.data?.metadata?.column
}

export const moveCardToAnotherColumnAPI = async ({
  cardId,
  prevColumnId,
  cardOrderIdsOfPrevColumn,
  nextColumnId,
  cardOrderIdsOfNextColumn
}) => {
  const response = await authorizedAxiosInstance.patch('/columns/move-card-to-another-column', {
    cardId,
    prevColumnId,
    cardOrderIdsOfPrevColumn,
    nextColumnId,
    cardOrderIdsOfNextColumn
  })
  return response.data?.metadata
}

export const deleteCardAPI = async (cardId) => {
  const response = await authorizedAxiosInstance.delete(`/cards/${cardId}`)
  return response.data?.metadata
}

export const deleteColumnAPI = async (columnId) => {
  const response = await authorizedAxiosInstance.delete(`/columns/${columnId}`)
  return response.data?.metadata
}

export const createNewCardAPI = async (card) => {
  const response = await authorizedAxiosInstance.post('/cards', card)
  return response.data?.metadata?.card
}

export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post('/users/register', data)
  return response.data?.metadata
}

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post('/users/verify', data)
  return response.data?.metadata
}

export const loginAPI = async (data) => {
  const response = await authorizedAxiosInstance.post('/users/login', data)
  return response.data?.metadata
}
