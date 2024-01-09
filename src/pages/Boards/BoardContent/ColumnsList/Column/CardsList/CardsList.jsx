import Box from '@mui/material/Box'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Card from './Card/Card'

function CardsList({ cards }) {

  return (
    <SortableContext items={cards.map(card => card._id)} strategy={verticalListSortingStrategy}>
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
        {cards?.map(card => <Card key={card._id} card={card} />)}
      </Box>
    </SortableContext>
  )
}

export default CardsList
