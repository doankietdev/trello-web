import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AppBar from '~/components/AppBar/AppBar'

function DefaultLayout({ children }) {
  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'auto',
        bgcolor: 'primary.main'
      }}
    >
      <AppBar sx={{ px: 2 }} />
      {children}
    </Box>
  )
}

export default DefaultLayout
