import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import { useDispatch } from 'react-redux'
import { createNewBoard } from '~/features/boards/boardsThunks'
import AddBoardForm from '~/components/AddBoardForm/AddBoardForm'

function BoardsBar() {
  const buttonStyles = {
    color: 'text.secondary',
    justifyContent: 'flex-start',
    borderRadius: '10px',
    px: 2
  }

  const [title, setTitle] = useState('')
  const [visibility, setVisibility] = useState('public')
  const [isOpenForm, setOpenForm] = useState(false)
  const dispatch = useDispatch()

  const handleOpenForm = () => {
    setOpenForm(true)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleVisibilityChange = (event) => {
    setVisibility(event.target.value)
  }

  const handleCancelForm = () => {
    setTitle('')
    setVisibility('public')
    setOpenForm(false)
  }

  const handleAddBoard = () => {
    dispatch(createNewBoard({ title, type: visibility }))
  }

  return (
    <Box sx={{
      position: 'fixed',
      overflowX: 'hidden'
    }}>
      {isOpenForm ? (
        <AddBoardForm
          title={title}
          visibility={visibility}
          onTitleChange={handleTitleChange}
          onVisibilityChange={handleVisibilityChange}
          onCancel={handleCancelForm}
          onAdd={handleAddBoard}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'primary.dark',
            borderRadius: '10px'
          }}
        >
          <Button
            onClick={handleOpenForm}
            startIcon={<AddToPhotosIcon />}
            sx={buttonStyles}
          >
            Add board
          </Button>
          <Button sx={buttonStyles}>
            Contained
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default BoardsBar
