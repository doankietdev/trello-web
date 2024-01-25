import { useEffect } from 'react'
import Container from '@mui/material/Container'
import { useDispatch } from 'react-redux'
import { fetchBoardDetails } from '~/features/board/boardThunks'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

function Board() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBoardDetails())
  }, [dispatch])

  // if (status === 'loading') {
  //   return <Loading />
  // }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default Board
