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
import Column from './Column/Column'

function ComlumnsList({ columns }) {
  const [isOpenAddListForm, setOpenAddListForm] = useState(false)
  const [columnTitleInput, setColumnTitleInput] = useState('')

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
                theme.palette.mode === 'dark' ? '#333543' : '#ebecf0',
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
              value={columnTitleInput}
              onChange={(e) => setColumnTitleInput(e.target.value)}
              InputProps={{
                endAdornment: columnTitleInput ? (
                  <InputAdornment>
                    <Button
                      sx={{
                        minWidth: '40px',
                        maxWidth: '40px',
                        '&:hover': {
                          bgcolor: 'transparent'
                        },
                        '&:focus': {
                          bgcolor: 'transparent'
                        }
                      }}
                    >
                      <CloseIcon
                        position="start"
                        fontSize="small"
                        sx={{ color: '#000000' }}
                        onClick={() => setColumnTitleInput('')}
                      />
                    </Button>
                  </InputAdornment>
                ) : null
              }}
              sx={{
                width: '100%',
                mb: 1,
                '& label': { color: '#44546F', fontWeight: 'bold' },
                '& input': { fontSize: '1rem', fontWeight: 'bold' },
                '& label.Mui-focused': { color: 'primary.main' },
                '& .MuiOutlinedInput-root': {
                  pr: 0.5,
                  '& fieldset': { borderColor: 'primary.main' },
                  '&:hover fieldset': { borderColor: 'primary.main' },
                  '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                }
              }}
            />
            <Button
              sx={{
                px: 1.5,
                color: 'white',
                bgcolor: 'primary.main',
                '&:hover': {
                  color: 'white',
                  bgcolor: 'primary.dark'
                }
              }}
            >
              Add list
            </Button>
            <Button
              onClick={() => setOpenAddListForm(!isOpenAddListForm)}
              sx={{
                color: 'white',
                maxWidth: '40px',
                minWidth: '40px',
                ml: 0.8,
                '&:hover': {
                  bgcolor: '#D0D4DB'
                }
              }}
            >
              <CloseIcon
                position="start"
                fontSize="small"
                sx={{
                  color: '#000000',
                  cursor: 'pointer'
                }}
                // onClick={() => setSearchValue('')}
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
              Add another list
            </Button>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ComlumnsList
