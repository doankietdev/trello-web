import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

function Loading({ caption }) {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        gap: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'primary.main'
      }}
    >
      <CircularProgress sx={{ color: 'text.secondary' }} />
      <Typography>{caption}</Typography>
    </Box>
  )
}

export default Loading
