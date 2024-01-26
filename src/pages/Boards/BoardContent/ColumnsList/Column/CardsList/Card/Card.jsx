import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch } from 'react-redux'
import { deleteCard } from '~/features/board/column/card/cardThunks'

function Card({ card }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card._id, data: { ...card } })
  const dndCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: (theme) =>
      isDragging ? `2px solid ${theme.palette.primary.light}` : undefined
  }

  const dispatch = useDispatch()

  const shouldShowCardActions =
    !!card?.memberIds?.length ||
    !!card?.comments?.length ||
    !!card?.attachments?.length

  const handleDeleteCard = () => {
    dispatch(deleteCard(card))
  }

  return (
    <MuiCard
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        ...dndCardStyles,
        mb: 1,
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgb(0, 0, 0, 0.25)',
        opacity: card?.FE_PlaceholderCard && 0,
        height: card?.FE_PlaceholderCard && '6px',
        pointerEvents: card?.FE_PlaceholderCard && 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Box>
        {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>{card?.title}</Typography>
        </CardContent>
        {shouldShowCardActions && (
          <CardActions sx={{ p: '0 4px 8px' }}>
            {!!card?.memberIds?.length && (
              <Button
                size="small"
                startIcon={<GroupIcon />}
                sx={{
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: 'hoverBgcolor.secondary',
                    color: 'text.primary'
                  }
                }}
              >
                {card?.memberIds?.length}
              </Button>
            )}
            {!!card?.comments?.length && (
              <Button
                size="small"
                startIcon={<CommentIcon />}
                sx={{
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: 'hoverBgcolor.secondary',
                    color: 'text.primary'
                  }
                }}
              >
                {card?.comments?.length}
              </Button>
            )}
            {!!card?.attachments?.length && (
              <Button
                size="small"
                startIcon={<AttachmentIcon />}
                sx={{
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: 'hoverBgcolor.secondary',
                    color: 'text.primary'
                  }
                }}
              >
                {card?.attachments?.length}
              </Button>
            )}
          </CardActions>
        )}
      </Box>
      <Box>
        <Button
          onClick={handleDeleteCard}
          sx={{
            minWidth: '36px',
            maxWidth: '36px',
            bgcolor: 'transparent',
            mr: 1,
            '&:hover': { bgcolor: 'hoverBgcolor.secondary' }
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
      </Box>
    </MuiCard>
  )
}

export default Card
