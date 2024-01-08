import Box from '@mui/material/Box'
import ColumnsList from './ColumnsList/ColumnsList'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  const { columns, columnOrderIds } = board
  const orderedColumns = mapOrder(columns, columnOrderIds, '_id')

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
      <ColumnsList columns={orderedColumns} />
    </Box>
  )
}

export default BoardContent
