import Typography from '@mui/material/Typography'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'

function Card({ tempHideMedia, tempHideAction }) {
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgb(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}
    >
      {tempHideMedia || <CardMedia
        sx={{ height: 140 }}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLH5iXWxXtzpIz6rPw02n7r-EADsWL_8y581GxJe2EEf24aVozLgW_fr8PzvaLsh4JMQ&usqp=CAU"
        title="green iguana"
      />}
      <CardContent
        sx={{
          p: 1.5,
          '&:last-child': { p: 1.5 }
        }}
      >
        <Typography>Card 01</Typography>
      </CardContent>
      {tempHideAction || <CardActions sx={{ p: '0 4px 8px' }}>
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          10
        </Button>
      </CardActions>}
    </MuiCard>
  )
}

export default Card
