import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import { fetchBoardDetails } from '~/features/boards/boardsThunks'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

function Board() {
  const dispatch = useDispatch()
  const { boardId } = useParams()
  useEffect(() => {
    dispatch(fetchBoardDetails(boardId))
  }, [boardId, dispatch])

  // if (status === 'loading') {
  //   return <Loading />
  // }

  return (
    <Box>
      <BoardBar />
      <BoardContent />
    </Box>
  )
}

export default Board
