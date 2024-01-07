import Box from '@mui/material/Box'
import ComlumnsList from './ColumnsList/ComlumnsList'

function BoardContent() {
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}
    >
      <ComlumnsList />
    </Box>
  )
}

export default BoardContent
