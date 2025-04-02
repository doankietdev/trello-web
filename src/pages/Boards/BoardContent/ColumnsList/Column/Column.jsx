import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import AddCardIcon from '@mui/icons-material/AddCard'
import Cloud from '@mui/icons-material/Cloud'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useConfirm } from 'material-ui-confirm'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { deleteColumn } from '~/features/boards/column/columnThunks'
import { dispatch } from '~/redux/store'
import CardsList from './CardsList/CardsList'

function Column({ column }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column?._id, data: { ...column } })
  const dndColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    height: '100%'
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const [isOpenNewCardForm, setOpenNewCardForm] = useState(false)
  const open = Boolean(anchorEl)

  const confirmDialog = useConfirm()

  const orderedCards = column?.cards

  const handleOpenMoreOptions = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteList = async () => {
    await confirmDialog({
      title: 'Are you sure?',
      description: 'This action will permanently delete list and its cards! Are you sure?',
      confirmationText: 'Confirm'
    })
    await toast.promise(dispatch(deleteColumn({ columnId: column?._id })).unwrap(), {
      pending: 'Deleting list...',
      success: 'Delete list successfully',
      error: 'Delete list failed'
    })
  }

  const handleAddCardSuccess = () => {
    setOpenNewCardForm(false)
  }

  return (
    <Box
      sx={{
        cursor: 'pointer'
      }}
      ref={setNodeRef}
      style={dndColumnStyles}
      {...attributes}
    >
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: 'background.default',
          mx: 1,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}
      >
        {/* Box column header */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {column?.title}
          </Typography>
          <Box data-no-dnd>
            <Tooltip title="More options">
              <ExpandMoreIcon
                sx={{ cursor: 'pointer' }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-column-menu-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenMoreOptions}
              />
            </Tooltip>
            <Menu
              id="basic-column-menu-dropdown"
              anchorEl={anchorEl}
              data-no-dnd
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleDeleteList}>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete this list</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/*Card list*/}
        <CardsList
          newCardForm={{ isOpenNewCardForm, setOpenNewCardForm }}
          cards={orderedCards}
          columnId={column?._id}
          onAddCardSuccess={handleAddCardSuccess}
        />

        {/* Box column footer */}
        {!isOpenNewCardForm && (
          <Box
            sx={{
              height: (theme) => theme.trello.columnFooterHeight,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button
              data-no-dnd
              onClick={() => setOpenNewCardForm(true)}
              startIcon={<AddCardIcon />}
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? theme.palette.text.primary
                    : null,
                '&:hover': { bgcolor: 'primary.main' }
              }}
            >
              Add new card
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Column
