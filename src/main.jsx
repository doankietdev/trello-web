import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ConfirmProvider } from 'material-ui-confirm'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import theme from './theme.js'
import 'react-toastify/dist/ReactToastify.min.css'

const confirmDefaultOptions = {
  dialogProps: {
    sx: {
      '& .MuiDialogContent-root .MuiTypography-root': { color: 'text.primary' }
    }
  },
  confirmationButtonProps: {
    sx: {
      bgcolor: 'error.main',
      color: 'text.secondary',
      '&:hover': {
        bgcolor: 'secondary.light'
      }
    }
  },
  cancellationButtonProps: {
    sx: {
      '&:hover': {
        bgcolor: 'hoverBgcolor.secondary',
        color: 'text.primary'
      }
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider
        defaultOptions={confirmDefaultOptions}
      >
        <CssBaseline />
        <App />
        <ToastContainer draggable theme="colored" />
      </ConfirmProvider>
    </CssVarsProvider>
  </React.StrictMode>
)
