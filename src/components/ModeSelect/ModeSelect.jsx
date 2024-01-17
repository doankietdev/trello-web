import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import Box from '@mui/system/Box'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="mode-select-label"
        sx={{
          color: 'text.secondary',
          '&.Mui-focused': { color: 'text.secondary' }
        }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="mode-select-label"
        id="mode-select"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: 'text.secondary',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'text.secondary' },
          '& .MuiSvgIcon-root': { color: 'text.secondary' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'text.secondary' },
          '&.Mui-focused fieldset': { borderColor: 'text.secondary' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'text.secondary' }
        }}
      >
        <MenuItem value="light">
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <LightModeIcon />
            Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <DarkModeOutlinedIcon />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <SettingsBrightnessIcon />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
