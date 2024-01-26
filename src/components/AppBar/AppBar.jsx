import { useState } from 'react'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Profile from './Menus/Profile'
import { default as MuiAppBar } from '@mui/material/AppBar'

function AppBar({ sx }) {
  const [searchValue, setSearchValue] = useState('')

  return (
    <MuiAppBar
      position="sticky"
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        bgcolor: 'primary.main',
        '&::-webkit-scrollbar-track': { m: '10px' },
        ...sx
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button sx={{ color: 'text.secondary', px: 2, maxWidth: '40px', minWidth: '40px' }}>
          <AppsIcon />
        </Button>

        <Button
          startIcon={
            <SvgIcon
              component={trelloIcon}
              fontSize="small"
              inheritViewBox
              sx={{ color: 'text.secondary' }}
            />
          }
          sx={{ px: 2 }}
        >
          <Typography
            variant="span"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'text.secondary'
            }}
          >
            Trello
          </Typography>
        </Button>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined" startIcon={<AddToPhotosIcon />}>
            Create
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search"
          type="text"
          size="small"
          variant="outlined"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchValue ? (
              <InputAdornment>
                <Button
                  onClick={() => setSearchValue('')}
                  sx={{
                    minWidth: '36px',
                    maxWidth: '36px',
                    bgcolor: 'transparent',
                    '&:hover': {
                      bgcolor: 'transparent'
                    }
                  }}
                >
                  <CloseIcon
                    position="start"
                    fontSize="small"
                    sx={{
                      color: (theme) =>
                        `${theme.palette.text.primary} !important`
                    }}
                  />
                </Button>
              </InputAdornment>
            ) : null
          }}
          sx={{
            '& label': { color: 'text.secondary' },
            '& input': { color: 'text.secondary' },
            '& .MuiSvgIcon-root': {
              color: (theme) => `${theme.palette.text.secondary} !important`
            },
            '& label.Mui-focused': { color: 'text.secondary' },
            '& .MuiOutlinedInput-root': {
              pr: 0.3,
              '& fieldset': { borderColor: 'text.secondary' },
              '&:hover fieldset': { borderColor: 'text.secondary' },
              '&.Mui-focused fieldset': {
                borderColor: (theme) =>
                  `${theme.palette.text.secondary} !important`
              }
            }
          }}
        />
        <ModeSelect />

        <Tooltip title="Notifications">
          <Badge color="secondary" badgeContent={3} sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'text.secondary' }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon
            sx={{ cursor: 'pointer', color: 'text.secondary' }}
          />
        </Tooltip>

        <Tooltip title="Profile">
          <Profile />
        </Tooltip>
      </Box>
    </MuiAppBar>
  )
}

export default AppBar
