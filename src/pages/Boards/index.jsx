import Grid from '@mui/material/Grid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BoardsBar from '~/components/BoardsBar/BoardsBar'
import { fetchBoards } from '~/features/boards/boardsThunks'
import { boardsSelector } from '~/redux/selectors'
import BoardCard from './BoardCard/BoardCard'

function Boards() {
  const dispatch = useDispatch()
  const boards = useSelector(boardsSelector)

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item lg={2}>
        <BoardsBar />
      </Grid>
      <Grid container item lg={10} rowSpacing={4} columnSpacing={4} alignItems="center">
        {boards?.map((board, index) => (
          <Grid item lg={3} key={index}>
            <BoardCard key={index} board={board} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default Boards
