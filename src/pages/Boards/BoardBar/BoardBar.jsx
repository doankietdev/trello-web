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
import { useSelector } from 'react-redux'
import { boardSelector } from '~/redux/selectors'
import { capitalizeFirstLetter } from '~/utils/formatter'

const menuStyles = {
  color: 'text.secondary',
  background: 'none',
  borderRadius: '8px',
  '& .MuiSvgIcon-root': { color: 'text.secondary' },
  '&.MuiChip-clickable:hover': { bgcolor: 'primary.light' }
}

function BoardBar() {
  const { board } = useSelector(boardSelector)

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
      bgcolor: 'primary.dark',
      '&::-webkit-scrollbar-track': { m: '10px' }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          icon={<DashboardIcon />}
          label={board?.title}
          clickable
          sx={menuStyles}
        />

        <Chip
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
          sx={menuStyles}
        />

        <Chip
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
          sx={menuStyles}
        />

        <Chip
          icon={<BoltIcon />}
          label="Automation"
          clickable
          sx={menuStyles}
        />

        <Chip
          icon={<FilterListIcon />}
          label="Filters"
          clickable
          sx={menuStyles}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" startIcon={<PersonAddIcon />}>Invite</Button>
        <AvatarGroup
          max={4}
          total={5}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: '1rem',
              border: 'none',
              color: 'text.secondary',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: 'primary.light' }
            }
          }}
        >
          <Tooltip title="Doan Anh Kiet">
            <Avatar alt="Doan Anh Kiet" src="https://avatars.githubusercontent.com/u/89434076?v=4" />
          </Tooltip>
          <Tooltip title="Doan Anh Kiet">
            <Avatar alt="Doan Anh Kiet" src="https://scontent.fsgn13-3.fna.fbcdn.net/v/t1.6435-9/37086496_520383038365039_7924600177384488960_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=dd63ad&_nc_eui2=AeHfSYI9PJqXrocbIFqxa9x5MT3jLhNK2tgxPeMuE0ra2PPh0GuXzTWSCN6oRS_DybqzJye5ra7v1vyeiC1h6Wut&_nc_ohc=FxyW2Cqj45kAX-3c9jm&_nc_ht=scontent.fsgn13-3.fna&oh=00_AfDobK9fzFpgmCZCqSB1HzK6aQwx3w8Zk3sjyOi5lGuSbA&oe=65C8ECA2" />
          </Tooltip>
          <Tooltip title="Doan Anh Kiet">
            <Avatar alt="Doan Anh Kiet" src="https://scontent.fsgn13-3.fna.fbcdn.net/v/t1.6435-9/50285524_637593503310658_6768280370098995200_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=dd63ad&_nc_eui2=AeGgg3pfOvgJH_sQZMY8CSpFp8m2v0qccjCnyba_SpxyMOuSUDETuw7M61gvT_uJXvhUmbggNP0WPalYjooHQ_4r&_nc_ohc=Zxbe1G1uG8oAX89mFi4&_nc_ht=scontent.fsgn13-3.fna&oh=00_AfDDGzjTvqnAxQzEXGWCD9q2Sc9Wg-KQy12BYBDx_J_1SA&oe=65C9069E" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
