import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const menuStyles = {
  color: 'white',
  bgcolor: '',
  border: 'none',
  borderRadius: '8px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&.MuiChip-clickable:hover': {
    bgcolor: 'primary.dark'
  },
  '&:active': {
    boxShadow: 'none'
  }
}

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      borderBottom: '1px solid white'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          icon={<DashboardIcon />}
          label="Doan Anh Kiet Board"
          variant="outlined"
          clickable
          sx={menuStyles}
        />

        <Chip
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          variant="outlined"
          clickable
          sx={menuStyles}
        />

        <Chip
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          variant="outlined"
          clickable
          sx={menuStyles}
        />

        <Chip
          icon={<BoltIcon />}
          label="Automation"
          variant="outlined"
          clickable
          sx={menuStyles}
        />

        <Chip
          icon={<FilterListIcon />}
          label="Filters"
          variant="outlined"
          clickable
          sx={menuStyles}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Invite
        </Button>

        <AvatarGroup
          max={4}
          total={5}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: '1rem',
              border: 'none'
            }
          }}
        >
          <Tooltip title="Doan Anh Kiet">
            <Avatar alt="Doan Anh Kiet" src="https://avatars.githubusercontent.com/u/89434076?v=4" />
          </Tooltip>
          <Tooltip title="Doan Anh Kiet">
            <Avatar alt="Doan Anh Kiet" src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/410419631_1843406726062657_2567995363253550615_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHIaZjm1mYGIAh9KDyqBSReSVRXzXQ4ucBJVFfNdDi5wDiZmt7IUsQDwgz1xmSSFQFksyI-F5GUtoY98abF1g6M&_nc_ohc=PHpEGcTOyZYAX84dJ8w&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfAZ5DyflMwnfU8cJJuCx9NP_DqS7pK60bTJC5xgQOjSUg&oe=659C1CBB" />
          </Tooltip>
          <Tooltip title="Doan Anh Kiet">
            <Avatar alt="Doan Anh Kiet" src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/278216457_1439232079813459_9083539604491249204_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeFo3Xzmvv4k6Tyh6FItMsFeWenivSPLdh9Z6eK9I8t2H9idGV0a92lH5KbFIgqdW9SAAyh2-p2vXrQ-s_HNkFt3&_nc_ohc=KN1_UrL7J18AX-Z7uzI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfC7zC1Ar240N3aZcUhY2exF8pnCReyUsBWrF_yB5-r9Ww&oe=659C11F6" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
