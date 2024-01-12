import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  closestCenter
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'
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
  const [oldColumn, setOldColumn] = useState(null)

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.some(card => card._id === cardId))
  }

  const handleDragStart = (event) => {
    const isCard = event?.active?.data?.current?.columnId
    const activeCardId = event?.active?.id
    setActiveDragItemId(activeCardId)
    setActiveDragItemType(
      isCard ? activeDragItemTypes.card : activeDragItemTypes.column
    )
    setActiveDragItemData(event.active?.data?.current)
    if (isCard) {
      setOldColumn(findColumnByCardId(activeCardId))
    }
  }

  const handleDragOver = (event) => {
    // // handle drag card outside column
    // const overDragItemType = event?.over?.data?.current?.columnId ? activeDragItemTypes.card : activeDragItemTypes.column
    // add condition "|| overDragItemType === activeDragItemTypes.column" into below if when do above this
    if (activeDragItemType === activeDragItemTypes.column) {
      return
    }
    const { active, over } = event

    if (!active && !over ) return

    const {
      id: activeDraggingCardId, data: { current: activeDraggingCard }
    } = active
    const {
      id: overCardId
    } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn && !overColumn) return
    if (activeColumn?._id === overColumn?._id) return

    setOrderedColumns(prevColumns => {
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn?._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn?._id)

      const overCardIndex = nextOverColumn?.cards?.findIndex(card => card?._id === overCardId)
      const isBelowOverCard = active?.rect?.current?.translated &&
        active?.rect?.current?.translated.top > over?.rect?.top + over?.rect?.height
      const modifier = isBelowOverCard ? 1 : 0
      const newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier :
        overColumn?.cards?.length + 1

      if (nextActiveColumn) {
        nextActiveColumn.cards = activeColumn?.cards?.filter(card => card?._id !== activeDraggingCardId)
        nextActiveColumn.cardOrderIds = activeColumn?.cards?.map(card => card?._id)
      }
      if (nextOverColumn) {
        // nextOverColumn.cards = nextOverColumn?.cards?.filter(card => card?._id !== activeDraggingCardId)
        nextOverColumn.cards = nextOverColumn?.cards?.toSpliced(newCardIndex, 0, activeDraggingCard)
        nextOverColumn.cardOrderIds = nextOverColumn?.cards?.map(card => card?._id)
      }
      return nextColumns
    })
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return

    const isDroppingCard = activeDragItemType === activeDragItemTypes.card
    if (isDroppingCard) {
      const {
        id: activeDroppingCardId, data: { current: activeDroppingCard }
      } = active
      const {
        id: overCardId
      } = over

      const overColumn = findColumnByCardId(overCardId)
      if (oldColumn?._id === overColumn?._id) {
        setOrderedColumns(prevOrderedColumns => {
          const nextColumns = cloneDeep(prevOrderedColumns)
          const oldCardIndex = oldColumn?.cards?.findIndex(card => card?._id === activeDroppingCardId)
          const newCardIndex = oldColumn?.cards?.findIndex(card => card?._id === overCardId)
          const targetColumn = nextColumns.find(column => column?._id === oldColumn?._id)

          targetColumn.cards = arrayMove(targetColumn?.cards, oldCardIndex, newCardIndex)
          targetColumn.cardOrderIds = targetColumn?.cards?.map(card => card?._id)
          return nextColumns
        })
      } else {
        console.log('Diff column');
      }
    }

    const isDroppingColumn = activeDragItemType === activeDragItemTypes.column
    if (isDroppingColumn && active?.id !== over?.id) {
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
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
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
