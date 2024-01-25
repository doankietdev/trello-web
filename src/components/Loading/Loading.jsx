import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

function Loading() {
  return (
    <Box
      sx={{
        height: '100vh',
        gap: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'primary.main'
      }}
    >
      <CircularProgress sx={{ color: 'text.secondary' }} />
    </Box>
  )
}

export default Loading
