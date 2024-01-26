import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import AppBar from '~/components/AppBar/AppBar'

function DefaultLayout({ children }) {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: '100vh',
        bgcolor: 'primary.main'
      }}
    >
      <AppBar />
      <Divider sx={{ bgcolor: 'text.secondary' }} />
      {children}
    </Container>
  )
}

export default DefaultLayout
