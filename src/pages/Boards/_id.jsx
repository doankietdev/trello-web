import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '65a2f9773f5655539e391e92'
    fetchBoardDetailsAPI(boardId)
      .then(data => {
        setBoard(data?.metadata?.board)
      })
  }, [])

  const createNewColumn = async (column) => {
    const responseColumn = await createNewColumnAPI({
      ...column,
      boardId: board?._id
    })

    const boardToUpdate = { ...board }
    boardToUpdate.columns.push(responseColumn)
    boardToUpdate.columnOrderIds.push(responseColumn?._id)
    setBoard(boardToUpdate)
  }

  const createNewCard = async (card, columnId) => {
    const responseCard = await createNewCardAPI({
      ...card,
      boardId: board?._id,
      columnId
    })

    const boardToUpdate = { ...board }
    const columnToUpdate = boardToUpdate?.columns?.find(column => column?._id === columnId)
    if (columnToUpdate) {
      columnToUpdate?.cards?.push(responseCard)
      columnToUpdate?.cardOrderIds?.push(responseCard?._id)
    }
    setBoard(boardToUpdate)
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} />
    </Container>
  )
}

export default Board
