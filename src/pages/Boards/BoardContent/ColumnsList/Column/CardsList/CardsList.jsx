import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import CloseIcon from '@mui/icons-material/Close'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Card from './Card/Card'

function CardsList({ newCardForm, cards }) {
  const [cardTitleInput, setCardTitleInput] = useState('')
  const cardTitleFormElement = useRef()
  useEffect(() => {
    cardTitleFormElement.current?.scrollIntoView({ behavior: 'smooth' })
  }, [newCardForm])

  const handleEnterCardTitle = (event) => setCardTitleInput(event.target.value)

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
                  <InputAdornment>
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
                opacity: 0.8,
                '& label': { fontWeight: 'bold' },
                '& textarea': { fontWeight: 'bold' },
                '& .MuiOutlinedInput-root': { pr: 0.3 }
              }}
            />
            <Button
              data-no-dnd
              variant="contained"
              startIcon={<NoteAddIcon />}
              sx={{
                px: 1.5
              }}
            >
              Add list
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
