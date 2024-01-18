import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import CloseIcon from '@mui/icons-material/Close'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { toast } from 'react-toastify'
import Column from './Column/Column'

function ComlumnsList({ columns }) {
  const [isOpenAddListForm, setOpenAddListForm] = useState(false)
  const [listTitleInput, setListTitleInput] = useState('')

  const handleAddList = () => {
    if (!listTitleInput) {
      toast.error('Please enter list title', { position: 'bottom-left' })
      return
    }
  }

  return (
    <SortableContext
      items={columns.map((column) => column._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          '&::-webkit-scrollbar-track': { m: '10px' }
        }}
      >
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}
        {isOpenAddListForm ? (
          <Box
            sx={{
              padding: 1,
              minWidth: '300px',
              maxWidth: '300px',
              bgcolor: (theme) =>
                theme.palette.background.default,
              mx: 1,
              borderRadius: '6px',
              height: 'fit-content',
              maxHeight: (theme) =>
                `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
            }}
          >
            <TextField
              id="outlined-column-title-input"
              label="Enter list title"
              type="text"
              size="small"
              autoFocus
              value={listTitleInput}
              onChange={(e) => setListTitleInput(e.target.value)}
              InputProps={{
                endAdornment: listTitleInput ? (
                  <InputAdornment>
                    <Button
                      onClick={() => setListTitleInput('')}
                      sx={{
                        minWidth: '36px',
                        maxWidth: '36px',
                        bgcolor: 'transparent',
                        '&:hover': {
                          // bgcolor: (theme) => theme.palette.mode === 'light' ? '#D0D4DB' : null
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
              sx={{
                width: '100%',
                mb: 1,
                opacity: 0.8,
                '& label': { fontWeight: 'bold' },
                '& input': { fontWeight: 'bold' },
                '& .MuiOutlinedInput-root': { pr: 0.3 }
              }}
            />
            <Button
              variant="contained"
              startIcon={<NoteAddIcon />}
              onClick={handleAddList}
              sx={{
                px: 1.5
              }}
            >
              Add list
            </Button>
            <Button
              onClick={() => setOpenAddListForm(!isOpenAddListForm)}
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
        ) : (
          <Box
            onClick={() => setOpenAddListForm(!isOpenAddListForm)}
            sx={{
              minWidth: '200px',
              maxWidth: '200px',
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content'
            }}
          >
            <Button
              startIcon={<NoteAddIcon />}
              variant="contained"
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1,
                bgcolor: '#ffffff30',
                '&:hover': {
                  bgcolor: '#ffffff54'
                }
              }}
            >
              Add new list
            </Button>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ComlumnsList
