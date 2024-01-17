import Typography from '@mui/material/Typography'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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
    border: (theme) => isDragging ? `2px solid ${theme.palette.primary.light}` : undefined
  }

  const shouldShowCardActions = !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length

  return (
    <MuiCard
      ref={setNodeRef} {...attributes} {...listeners}
      sx={{
        ...dndCardStyles,
        mb: 1,
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgb(0, 0, 0, 0.25)',
        opacity: card?.FE_PlaceholderCard ? '0' : '1',
        minWidth: card?.FE_PlaceholderCard ? '280px' : 'unset',
        pointerEvents: card?.FE_PlaceholderCard ? 'none' : 'unset',
        position: card?.FE_PlaceholderCard ? 'fixed' : 'unset'
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardActions &&
        <CardActions sx={{ p: '0 4px 8px' }}>
          {!!card?.memberIds?.length &&
            <Button size="small"
              startIcon={<GroupIcon />}
              sx={{
                bgcolor: 'transparent',
                '&:hover': { bgcolor: 'hoverBgcolor.secondary', color: 'text.primary' }
              }}
            >
              {card?.memberIds?.length}
            </Button>}
          {!!card?.comments?.length &&
            <Button size="small"
              startIcon={<CommentIcon />}
              sx={{
                bgcolor: 'transparent',
                '&:hover': { bgcolor: 'hoverBgcolor.secondary', color: 'text.primary' }
              }}
            >
              {card?.comments?.length}
            </Button>}
          {!!card?.attachments?.length &&
            <Button size="small"
              startIcon={<AttachmentIcon />}
              sx={{
                bgcolor: 'transparent',
                '&:hover': { bgcolor: 'hoverBgcolor.secondary', color: 'text.primary' }
              }}
            >
              {card?.attachments?.length}
            </Button>}
        </CardActions>
      }
    </MuiCard>
  )
}

export default Card
