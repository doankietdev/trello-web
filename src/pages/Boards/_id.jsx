import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import {
  fetchBoardDetailsAPI,
  updateBoardAPI,
  createNewColumnAPI,
  updateColumnAPI,
  deleteColumnAPI,
  createNewCardAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatter'
import { mapOrder } from '~/utils/sorts'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '65a2f9773f5655539e391e92'
    fetchBoardDetailsAPI(boardId)
      .then(board => {
        board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
        board?.columns?.forEach(column => {
          if (!column?.cards?.length) {
            column.cards = [generatePlaceholderCard(board?._id, column?._id)]
            column.cardOrderIds = [column.cards[0]?._id]
            return
          }
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
        })
        setBoard(board)
      })
  }, [])

  const createNewColumn = async (column) => {
    const responseColumn = await createNewColumnAPI({
      ...column,
      boardId: board?._id
    })

    const boardToUpdate = { ...board }
    boardToUpdate.columns.push({
      ...responseColumn,
      cards: [generatePlaceholderCard(board?._id, column?._id)],
      cardOrderIds: [generatePlaceholderCard(board?._id, column?._id)?._id]
    })
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

  // remember debug at here when bug drag column
  const moveColumns = async (columnOrderIds) => {
    await updateBoardAPI(board?._id, { columnOrderIds })
  }

  const moveCardInSameColumn = async (columnId, cardOrderIds) => {
    await updateColumnAPI(columnId, { cardOrderIds })
  }

  const deleteColumn = async (columnId) => {
    await deleteColumnAPI(columnId)

    const newBoard = { ...board }
    newBoard.columns = board?.columns?.filter(column => column?._id !== columnId)
    newBoard.columnOrderIds = board?.columnOrderIds?.filter(columnOrderId => columnOrderId !== columnId)
    console.log(newBoard)
    setBoard(newBoard)
  }

  if (!board) {
    return (
      <Box
        sx={{
          height: '100vh',
          gap: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'primary.main'
        }}
      >
        <CircularProgress sx={{ color: 'text.secondary' }} />
      </Box>
    )
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        moveColumns={moveColumns}
        createNewCard={createNewCard}
        moveCardInSameColumn={moveCardInSameColumn}
        deleteColumn={deleteColumn}
      />
    </Container>
  )
}

export default Board
