import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import CloseIcon from '@mui/icons-material/Close'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addNewCard } from '~/features/boards/column/card/cardThunks'
import { currentBoardSelector } from '~/redux/selectors'
import { dispatch } from '~/redux/store'
import Card from './Card/Card'

function CardsList({ newCardForm, cards, columnId, onAddCardSuccess = () => {} }) {
  const [cardTitleInput, setCardTitleInput] = useState('')
  const cardTitleFormElement = useRef()
  useEffect(() => {
    cardTitleFormElement.current?.scrollIntoView({ behavior: 'smooth' })
  }, [newCardForm])

  const currentBoard = useSelector(currentBoardSelector)

  const handleEnterCardTitle = (event) => setCardTitleInput(event.target.value)
  const handleAddCard = async () => {
    if (!cardTitleInput) {
      toast.error('Please enter card title')
      return
    }
    await toast.promise(dispatch(addNewCard({
      title: cardTitleInput,
      columnId,
      boardId: currentBoard?._id
    })).unwrap(), {
      pending: 'Adding new card...',
      success: 'Add new card successfully',
      error: 'Add new card failed'
    })
    setCardTitleInput('')
    onAddCardSuccess()
  }

  return (
    <SortableContext items={cards.map(card => card._id)} strategy={verticalListSortingStrategy}>
      <Box
        sx={{
          p: '0 5px', // custom space scrollbar
          m: '0 5px', // custom space scrollbar
          overflow: 'auto',
          maxHeight: (theme) => `calc(
            ${theme.trello.boardContentHeight} -
            ${theme.spacing(5)} -
            ${theme.trello.columnHeaderHeight} -
            ${theme.trello.columnFooterHeight}
          )`
        }}
      >
        {cards?.map(card => <Card key={card._id} card={card} />)}
        {newCardForm?.isOpenNewCardForm && (
          <Box
            ref={cardTitleFormElement}
            sx={{
              pb: 1
            }}
          >
            <TextField
              id="outlined-column-title-input"
              label="Enter list title"
              type="text"
              size="small"
              data-no-dnd
              autoFocus
              value={cardTitleInput}
              onChange={handleEnterCardTitle}
              InputProps={{
                endAdornment: cardTitleInput ? (
                  <InputAdornment position="end">
                    <Button
                      onClick={() => setCardTitleInput('')}
                      sx={{
                        minWidth: '36px',
                        maxWidth: '36px',
                        bgcolor: 'transparent',
                        '&:hover': {
                          bgcolor: 'transparent'
                        }
                      }}
                    >
                      <CloseIcon
                        position="start"
                        fontSize="small"
                        sx={{
                          color: (theme) => `${theme.palette.text.primary} !important`
                        }}
                      />
                    </Button>
                  </InputAdornment>
                ) : null
              }}
              multiline
              sx={{
                width: '100%',
                my: 1,
                '& label': { fontWeight: 'bold' },
                '& textarea': { fontWeight: 'bold' },
                '& .MuiOutlinedInput-root': { pr: 0.3 }
              }}
            />
            <Button
              data-no-dnd
              variant="contained"
              startIcon={<NoteAddIcon />}
              onClick={handleAddCard}
              sx={{
                px: 1.5
              }}
            >
              Add card
            </Button>
            <Button
              data-no-dnd
              onClick={() => newCardForm.setOpenNewCardForm(false)}
              sx={{
                maxWidth: '40px',
                minWidth: '40px',
                ml: 0.8,
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: 'hoverBgcolor.secondary'
                }
              }}
            >
              <CloseIcon
                position="start"
                fontSize="small"
                sx={{
                  color: 'text.primary',
                  cursor: 'pointer'
                }}
              />
            </Button>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default CardsList
