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
  createNewCardAPI,
  moveCardToAnotherColumnAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatter'
import { mapOrder } from '~/utils/sorts'
import { SUFFIX_PLACEHOLDER_CARD } from '~/utils/constants'

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
    const responseColumn = await createNewColumnAPI({ ...column, boardId: board?._id })

    const newBoard = { ...board }
    newBoard.columns.push({
      ...responseColumn,
      cards: [generatePlaceholderCard(board?._id, column?._id)],
      cardOrderIds: [generatePlaceholderCard(board?._id, column?._id)?._id]
    })
    newBoard.columnOrderIds.push(responseColumn?._id)
    setBoard(newBoard)
  }

  const createNewCard = async (card, columnId) => {
    const responseCard = await createNewCardAPI({
      ...card,
      boardId: board?._id,
      columnId
    })

    const newBoard = { ...board }
    const foundColumn = newBoard?.columns?.find(column => column?._id === columnId)
    if (foundColumn) {
      foundColumn?.cards?.push(responseCard)
      foundColumn?.cardOrderIds?.push(responseCard?._id)
      setBoard(newBoard)
    }
  }

  const moveColumns = async (newColumns) => {
    const columnOrderIds = newColumns.map(column => column?._id)
    await updateBoardAPI(board?._id, { columnOrderIds })

    const newBoard = { ...board }
    newBoard.columns = newColumns
    newBoard.columnOrderIds = columnOrderIds
    setBoard(newBoard)
  }

  const moveCardInSameColumn = async (columnId, newCards) => {
    const cardOrderIds = newCards?.map(card => card?._id)
    await updateColumnAPI(columnId, { cardOrderIds })

    const newBoard = { ...board }
    const foundColumn = newBoard?.columns?.find(column => column?._id === columnId)
    if (foundColumn) {
      foundColumn.cards = newCards
      foundColumn.cardOrderIds = cardOrderIds
      setBoard(newBoard)
    }
  }

  const moveCardInAnotherColumn = async ({
    cardId,
    prevColumnId,
    newCardsOfPrevColumn,
    nextColumnId,
    newCardsOfNextColumn
  }) => {
    let cardOrderIdsOfPrevColumn = newCardsOfPrevColumn.map(card => card?._id)
    const cardOrderIdsOfNextColumn = newCardsOfNextColumn.map(card => card?._id)
    if (cardOrderIdsOfPrevColumn[0]?.includes(SUFFIX_PLACEHOLDER_CARD)) {
      cardOrderIdsOfPrevColumn = []
    }

    await moveCardToAnotherColumnAPI({
      cardId,
      prevColumnId,
      cardOrderIdsOfPrevColumn,
      nextColumnId,
      cardOrderIdsOfNextColumn
    })

    const newBoard = { ...board }
    const prevColumn = newBoard?.columns?.find(column => column?._id === prevColumnId)
    const nextColumn = newBoard?.columns?.find(column => column?._id === nextColumnId)
    if (prevColumn) {
      prevColumn.cards = newCardsOfPrevColumn
      prevColumn.cardOrderIds = cardOrderIdsOfPrevColumn
    }
    if (nextColumn) {
      nextColumn.cards = newCardsOfNextColumn
      nextColumn.cardOrderIds = cardOrderIdsOfNextColumn
    }
    setBoard(newBoard)
  }

  const deleteColumn = async (columnId) => {
    await deleteColumnAPI(columnId)

    const newBoard = { ...board }
    newBoard.columns = board?.columns?.filter(column => column?._id !== columnId)
    newBoard.columnOrderIds = board?.columnOrderIds?.filter(columnOrderId => columnOrderId !== columnId)
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
        moveCardInAnotherColumn={moveCardInAnotherColumn}
        deleteColumn={deleteColumn}
      />
    </Container>
  )
}

export default Board
