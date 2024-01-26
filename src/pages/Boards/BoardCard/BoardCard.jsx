import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux'
import { deleteBoard } from '~/features/boards/boardsThunks'
import configs from '~/configs'

export default function BoardCard({ board }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleNavigate = () => {
    navigate(configs.routes.board(board?._id))
  }

  const handleDeleteBoard = (e) => {
    e.stopPropagation()
    dispatch(deleteBoard(board?._id))
  }

  return (
    <Card
      onClick={handleNavigate}
      sx={{
        borderRadius: '8px',
        boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
        transition: 'transform 250ms',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 14px 28px rgba(0,0,0,0.25)'
        },
        '& .MuiCardContent-root:last-child': {
          pb: 2
        }
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://www.vietnamconsulate-shihanoukville.org/wp-content/uploads/2021/09/giao-dien-trello.jpg"
        title={board?.title}
      />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 4px 8px 8px'
        }}
      >
        <Typography gutterBottom variant="body2" fontWeight="bold" mb={0} >
          {board?.title}
        </Typography>
        <Button
          onClick={handleDeleteBoard}
          sx={{
            minWidth: '36px',
            maxWidth: '36px',
            bgcolor: 'transparent',
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
      </CardContent>
    </Card>
  )
}
