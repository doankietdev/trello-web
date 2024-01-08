import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import ColumnsList from './ColumnsList/ColumnsList'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const { columns, columnOrderIds } = board
  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(columns, columnOrderIds, '_id'))
  }, [columns, columnOrderIds])

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active?.id !== over?.id) {
      setOrderedColumns(prevOrderedColumns => {
        const oldIndex = prevOrderedColumns.findIndex(column => column?._id === active?.id)
        const newIndex = prevOrderedColumns.findIndex(column => column?._id === over?.id)
        return arrayMove(prevOrderedColumns, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
    </DndContext>
  )
}

export default BoardContent
