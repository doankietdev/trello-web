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
      <InputLabel
        id="mode-select-label"
        sx={{
          color: 'white',
          '&.Mui-focused': { color: 'white' }
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
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '& .MuiSvgIcon-root': { color: 'white' }
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
