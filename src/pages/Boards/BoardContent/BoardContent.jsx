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
import Column from './ColumnsList/Column/Column'
import Card from './ColumnsList/Column/CardsList/Card/Card'
import { generatePlaceholderCard } from '~/utils/formatter'
import { SUFFIX_PLACEHOLDER_CARD } from '~/utils/constants'

const activeDragItemTypes = {
  column: 'column',
  card: 'card'
}

function BoardContent({
  board,
  createNewColumn,
  moveColumns,
  createNewCard,
  moveCardInSameColumn,
  moveCardInAnotherColumn,
  deleteColumn
}) {
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' }
      }
    })
  }

  const [orderedColumns, setOrderedColumns] = useState([])
  useEffect(() => {
    setOrderedColumns(board?.columns)
  }, [board])

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
    let overColumn = null
    // Check cardId?.includes(SUFFIX_PLACEHOLDER_CARD) to fix bug:
    // call moveCardToAnotherColumnAPI error, when fast drag card
    // to another empty column
    if (cardId?.includes(SUFFIX_PLACEHOLDER_CARD)) {
      const columnId = cardId?.slice(0, cardId?.indexOf(SUFFIX_PLACEHOLDER_CARD))
      overColumn = orderedColumns.find(column => column?._id === columnId)
    } else {
      overColumn = orderedColumns.find(column => column?.cards?.some(card => card._id === cardId))
    }
    return overColumn
  }

  const moveCardBetweenColumns = (
    oldColumn,
    overColumn,
    activeDraggingCardId,
    overCardId,
    active,
    over,
    activeDraggingCard,
    triggerFrom
  ) => {
    setOrderedColumns(prevColumns => {
      const nextColumns = cloneDeep(prevColumns)
      const nextOldColumn = nextColumns.find(column => column._id === oldColumn?._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn?._id)

      const overCardIndex = nextOverColumn?.cards?.findIndex(card => card?._id === overCardId)
      const isBelowOverCard = active?.rect?.current?.translated &&
        active?.rect?.current?.translated.top > over?.rect?.top + over?.rect?.height
      const modifier = isBelowOverCard ? 1 : 0
      const newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier :
        overColumn?.cards?.length + 1

      if (nextOldColumn) {
        nextOldColumn.cards = oldColumn?.cards?.filter(card => card?._id !== activeDraggingCardId)

        if (!nextOldColumn.cards?.length) {
          nextOldColumn.cards = [generatePlaceholderCard(board?._id, oldColumn?._id)]
        }

        nextOldColumn.cardOrderIds = nextOldColumn?.cards?.map(card => card?._id)
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

      if (triggerFrom === 'handleDragEnd') {
        moveCardInAnotherColumn({
          cardId: activeDraggingCard?._id,
          prevColumnId: nextOldColumn?._id,
          newCardsOfPrevColumn: nextOldColumn?.cards,
          nextColumnId: nextOverColumn?._id,
          newCardsOfNextColumn: nextOverColumn?.cards
        })
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
      activeDraggingCard,
      'handleDragOver'
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
          moveCardInSameColumn(oldColumn?._id, targetColumn.cards) // call API
          return nextColumns
        })
      } else {
        moveCardBetweenColumns(
          oldColumn,
          overColumn,
          activeDraggingCardId,
          overCardId,
          active,
          over,
          activeDraggingCard,
          'handleDragEnd'
        )
      }
    }

    const isDragColumn = activeDragItemType === activeDragItemTypes.column
    if (isDragColumn && active?.id !== over?.id) {
      setOrderedColumns(prevOrderedColumns => {
        const oldIndex = prevOrderedColumns.findIndex(column => column?._id === active?.id)
        const newIndex = prevOrderedColumns.findIndex(column => column?._id === over?.id)
        const nextOrderedColumns = arrayMove(prevOrderedColumns, oldIndex, newIndex)
        moveColumns(nextOrderedColumns) // call API
        return nextOrderedColumns
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
        <ColumnsList
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          deleteColumn={deleteColumn}
        />
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
