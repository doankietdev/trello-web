import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
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
    <>
      <BoardBar />
      <BoardContent />
    </>
  )
}

export default Board
