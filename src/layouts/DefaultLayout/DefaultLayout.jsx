import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import AppBar from '~/components/AppBar/AppBar'

function DefaultLayout() {
  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'auto',
        bgcolor: 'primary.main'
      }}
    >
      <AppBar sx={{ px: 2 }} />
      <Outlet />
    </Box>
  )
}

export default DefaultLayout
