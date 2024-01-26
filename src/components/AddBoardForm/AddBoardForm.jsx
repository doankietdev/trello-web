import { useState } from 'react'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'

function AddBoardForm({
  title,
  visibility,
  onTitleChange,
  onVisibilityChange,
  onAdd,
  onCancel,
  sx
}) {
  const buttonStyles = {
    color: 'text.secondary',
    justifyContent: 'flex-start',
    borderRadius: '10px',
    px: 2
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        padding: 2,
        bgcolor: 'primary.dark',
        ...sx
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: 'text.secondary', textAlign: 'center', mb: 1 }}
      >
        Add Board
      </Typography>
      <TextField
        autoFocus
        margin="dense"
        name="title"
        label="Title"
        value={title}
        onChange={onTitleChange}
        sx={{
          '& label': { color: 'text.secondary' },
          '& input': { color: 'text.secondary' },
          '& .MuiSvgIcon-root': {
            color: (theme) => `${theme.palette.text.secondary} !important`
          },
          '& label.Mui-focused': { color: 'text.secondary' },
          '& .MuiOutlinedInput-root': {
            pr: 0.3,
            '& fieldset': { borderColor: 'text.secondary' },
            '&:hover fieldset': { borderColor: 'text.secondary' },
            '&.Mui-focused fieldset': {
              borderColor: (theme) =>
                `${theme.palette.text.secondary} !important`
            }
          }
        }}
      />
      <Box sx={{ mt: 1, '.MuiOutlinedInput-root': { width: '100%' } }}>
        <InputLabel
          id="visibility-label"
          sx={{
            color: 'text.secondary',
            '&.Mui-focused': { color: 'text.secondary' }
          }}
        >
          Visibility
        </InputLabel>
        <Select
          labelId="visibility-label"
          id="visibility-select"
          value={visibility}
          label="Visibility"
          variant="outlined"
          onChange={onVisibilityChange}
          sx={{
            color: 'text.secondary',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'text.secondary'
            },
            '& .MuiSvgIcon-root': { color: 'text.secondary' },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'text.secondary'
            },
            '&.Mui-focused fieldset': { borderColor: 'text.secondary' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'text.secondary'
            }
          }}
        >
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
          <MenuItem value="workspace">Workspace</MenuItem>
        </Select>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          onClick={onCancel}
          startIcon={<DisabledByDefaultIcon />}
          sx={buttonStyles}
        >
          Cancel
        </Button>
        <Button
          onClick={onAdd}
          startIcon={<AddBoxIcon />}
          sx={buttonStyles}
        >
          Add
        </Button>
      </Box>
    </Box>
  )
}

export default AddBoardForm
