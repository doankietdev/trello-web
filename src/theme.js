import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { teal, deepOrange, cyan, orange } from '@mui/material/colors'

const APP_BAR_HEIGHT = '54px'
const BOARD_BAR_HEIGHT = '50px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT} )`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#0B4DA9' },
        secondary: { main: '#f50057' },
        text: { secondary: '#FFFFFF' },
        background: { default: '#F1F2F4', paper: '#FFFFFF' },
        error: { main: '#f50057' },
        hoverBgcolor: { secondary: '#00000012' }
      }
    },
    dark: {
      palette: {
        primary: { main: '#2c3e50' },
        secondary: { main: '#f50057' },
        text: { secondary: '#FFFFFF' },
        background: { default: '#0e1217', paper: '#1c1f26' },
        error: { main: '#f50057' },
        hoverBgcolor: { secondary: '#FFFFFF26' }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            background: '#c5c9d1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: '#d2d7df'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          textTransform: 'none',
          '&:hover': {
            color: theme.palette.text.secondary,
            background: theme.palette.primary.light
          },
          '&.MuiButton-outlined': {
            borderColor: theme.palette.text.secondary,
            background: 'transparent',
            color:  theme.palette.text.secondary,
            '&:hover': {
              borderWidth: '2px'
            }
          },
          '&.MuiButton-contained': {
            color: theme.palette.text.secondary
          }
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: '0.875rem',
          color: theme.palette.text.primary,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
              borderWidth: '2px'
            }
          },
          '& .MuiSvgIcon-root': { color: theme.palette.primary.main },
          '&.Mui-focused fieldset': {
            borderColor: `${theme.palette.primary.main}`
          }
          // '&:hover fieldset': { borderWidth: '2px !important' },
          // '&.Mui-focused fieldset': { borderWidth: '2px !important' }
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          fontSize: '0.875rem',
          '&.Mui-focused': { color: theme.palette.mode === 'dark' ? theme.palette.text.primary : null }
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    }
  }
})

export default theme
