import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import ColumnsList from './ColumnsList/ColumnsList'
import { mapOrder } from '~/utils/sorts'
import Column from './ColumnsList/Column/Column'
import Card from './ColumnsList/Column/CardsList/Card/Card'

function BoardContent({ board }) {
  const { columns, columnOrderIds } = board
  const activeDragItemTypes = {
    column: 'column',
    card: 'card'
  }
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' }
      }
    })
  }

  const [orderedColumns, setOrderedColumns] = useState([])
  useEffect(() => {
    setOrderedColumns(mapOrder(columns, columnOrderIds, '_id'))
  }, [columns, columnOrderIds])

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId ? activeDragItemTypes.card : activeDragItemTypes.column
    )
    setActiveDragItemData(event.active?.data?.current)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active?.id !== over?.id) {
      setOrderedColumns(prevOrderedColumns => {
        const oldIndex = prevOrderedColumns.findIndex(column => column?._id === active?.id)
        const newIndex = prevOrderedColumns.findIndex(column => column?._id === over?.id)
        return arrayMove(prevOrderedColumns, oldIndex, newIndex)
      })
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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
        <DragOverlay dropAnimation={dropAnimation} >
          {(!activeDragItemType) && null}
          {(activeDragItemType === activeDragItemTypes.column) && <Column column={activeDragItemData} />}
          {(activeDragItemType === activeDragItemTypes.card) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
