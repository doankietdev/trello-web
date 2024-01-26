import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ConfirmProvider } from 'material-ui-confirm'
import { ToastContainer } from 'react-toastify'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './redux/store.js'
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
      <ConfirmProvider defaultOptions={confirmDefaultOptions}>
        <CssBaseline />
        <ReduxProvider store={store}>
          <Router>
            <App />
          </Router>
        </ReduxProvider>
        <ToastContainer draggable theme="colored" />
      </ConfirmProvider>
    </CssVarsProvider>
  </React.StrictMode>
)
