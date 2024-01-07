import Box from '@mui/material/Box'
import Card from './Card/Card'

function CardsList() {
  return (
    <Box
      sx={{
        p: '0 5px', // custom space scrollbar
        m: '0 5px', // custom space scrollbar
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        maxHeight: (theme) => `calc(
          ${theme.trello.boardContentHeight} -
          ${theme.spacing(5)} -
          ${theme.trello.columnHeaderHeight} -
          ${theme.trello.columnFooterHeight}
        )`,
        '&::-webkit-scrollbar-thumb': { background: '#ced0da' },
        '&::-webkit-scrollbar-thumb:hover': { background: '#bfc2cf' }
      }}
    >
      <Card />
      <Card tempHideMedia />
      <Card tempHideMedia tempHideAction />
    </Box>
  )
}

export default CardsList
