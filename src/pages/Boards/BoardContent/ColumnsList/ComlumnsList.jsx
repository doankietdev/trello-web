import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { mapOrder } from '~/utils/sorts'

function ComlumnsList({ columns, columnOrderIds }) {
  const orderedColumns = mapOrder(columns, columnOrderIds, '_id')

  return (
    <Box sx={{
      bgcolor: 'inherit',
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      '&::-webkit-scrollbar-track': { m: '10px' }
    }}>
      {orderedColumns?.map(column => <Column key={column._id} column={column} />)}

      <Box
        sx={{
          minWidth: '200px',
          maxWidth: '200px',
          mx: 2,
          borderRadius: '6px',
          height: 'fit-content',
          bgcolor: '#ffffff3d'
        }}
      >
        <Button
          startIcon={<NoteAddIcon />}
          sx={{
            color: 'white',
            width: '100%',
            justifyContent: 'flex-start',
            pl: 2.5,
            py: 1
          }}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ComlumnsList
