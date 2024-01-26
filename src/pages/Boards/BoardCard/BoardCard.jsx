import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import configs from '~/configs'

export default function BoardCard({ board }) {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(configs.routes.board(board?._id))
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
        }
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://www.vietnamconsulate-shihanoukville.org/wp-content/uploads/2021/09/giao-dien-trello.jpg"
        title={board?.title}
      />
      <CardContent>
        <Typography gutterBottom variant="body" fontWeight="bold">
          {board?.title}
        </Typography>
      </CardContent>
    </Card>
  )
}
