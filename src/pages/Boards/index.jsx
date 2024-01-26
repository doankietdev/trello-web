import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { boardsSelector } from '~/redux/selectors'
import { fetchBoards } from '~/features/boards/boardsThunks'
import BoardCard from './BoardCard/BoardCard'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import BoardsBar from '~/components/BoardsBar/BoardsBar'

function Boards() {
  const dispatch = useDispatch()
  const boards = useSelector(boardsSelector)
  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  // if (status === 'loading') {
  //   return <Loading />
  // }

  return (
    <Grid container spacing={3} sx={{ px: 4, pt: 4 }}>
      <Grid item lg={2}>
        <BoardsBar />
      </Grid>
      <Grid
        container
        item
        lg={10}
        rowSpacing={4}
        columnSpacing={4}
        alignItems="center"
      >
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
