import { useState, useEffect, useCallback, useRef } from 'react'
import Box from '@mui/material/Box'
import {
  DndContext,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { MouseSensor, TouchSensor } from '~/customLibraries/DndKitSensors'
import { cloneDeep } from 'lodash'
import ColumnsList from './ColumnsList/ColumnsList'
import { mapOrder } from '~/utils/sorts'
import Column from './ColumnsList/Column/Column'
import Card from './ColumnsList/Column/CardsList/Card/Card'
import { generatePlaceholderCard } from '~/utils/formatter'

const activeDragItemTypes = {
  column: 'column',
  card: 'card'
}

function BoardContent({ board }) {
  const { columns, columnOrderIds } = board || {}

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

  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumn, setOldColumn] = useState(null)
  const lastOverId = useRef(null)

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.some(card => card._id === cardId))
  }

  const moveCardBetweenColumns = (
    activeColumn,
    overColumn,
    activeDraggingCardId,
    overCardId,
    active,
    over,
    activeDraggingCard
  ) => {
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

        if (!nextActiveColumn.cards?.length) {
          nextActiveColumn.cards = [generatePlaceholderCard(board?._id, activeColumn?._id)]
        }

        nextActiveColumn.cardOrderIds = activeColumn?.cards?.map(card => card?._id)
      }
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn?.cards?.filter(card =>
          card?._id !== activeDraggingCardId &&
          !card?.FE_PlaceholderCard // condition to fix bug dndKit drag card when empty column
        )
        nextOverColumn.cards = nextOverColumn?.cards?.toSpliced(newCardIndex, 0, {
          ...activeDraggingCard,
          columnId: nextOverColumn._id
        })

        nextOverColumn.cardOrderIds = nextOverColumn?.cards?.map(card => card?._id)
      }
      return nextColumns
    })
  }

  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType === activeDragItemTypes.column) {
      return closestCorners({ ...args })
    }

    const pointerIntersections = pointerWithin(args)
    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId) {
      const foundColumn = orderedColumns.find(column => column?._id === overId)
      if (foundColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container =>
            container?.id !== overId && foundColumn?.cardOrderIds?.includes(container?.id)
          )
        })[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  const handleDragStart = (event) => {
    const isCard = event?.active?.data?.current?.columnId
    const activeCardId = event?.active?.id
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

    if (!active || !over ) return

    const {
      id: activeDraggingCardId, data: { current: activeDraggingCard }
    } = active
    const {
      id: overCardId
    } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn && !overColumn) return
    if (activeColumn?._id === overColumn?._id) {
      return
    }

    moveCardBetweenColumns(
      activeColumn,
      overColumn,
      activeDraggingCardId,
      overCardId,
      active,
      over,
      activeDraggingCard
    )
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return

    const isDragCard = activeDragItemType === activeDragItemTypes.card
    if (isDragCard) {
      const {
        id: activeDraggingCardId, data: { current: activeDraggingCard }
      } = active
      const {
        id: overCardId
      } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      const isDragCardInSameColumn = oldColumn?._id === overColumn?._id
      if (isDragCardInSameColumn) {
        setOrderedColumns(prevOrderedColumns => {
          const nextColumns = cloneDeep(prevOrderedColumns)
          const oldCardIndex = oldColumn?.cards?.findIndex(card => card?._id === activeDraggingCardId)
          const newCardIndex = oldColumn?.cards?.findIndex(card => card?._id === overCardId)
          const targetColumn = nextColumns.find(column => column?._id === oldColumn?._id)

          targetColumn.cards = arrayMove(targetColumn?.cards, oldCardIndex, newCardIndex)
          targetColumn.cardOrderIds = targetColumn?.cards?.map(card => card?._id)
          return nextColumns
        })
      } else {
        moveCardBetweenColumns(
          activeColumn,
          overColumn,
          activeDraggingCardId,
          overCardId,
          active,
          over,
          activeDraggingCard
        )
      }
    }

    const isDragColumn = activeDragItemType === activeDragItemTypes.column
    if (isDragColumn && active?.id !== over?.id) {
      setOrderedColumns(prevOrderedColumns => {
        const oldIndex = prevOrderedColumns.findIndex(column => column?._id === active?.id)
        const newIndex = prevOrderedColumns.findIndex(column => column?._id === over?.id)
        return arrayMove(prevOrderedColumns, oldIndex, newIndex)
      })
    }

    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: 'primary.main',
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
