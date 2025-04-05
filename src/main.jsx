import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ConfirmProvider } from 'material-ui-confirm'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import store, { persistor } from './redux/store.js'
import theme from './theme.js'

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
          <PersistGate persistor={persistor}>
            <Router
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
              }}
            >
              <App />
            </Router>
          </PersistGate>
        </ReduxProvider>
        <ToastContainer draggable theme="colored" position="bottom-right" />
      </ConfirmProvider>
    </CssVarsProvider>
  </React.StrictMode>
)
