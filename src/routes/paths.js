import queryString from 'query-string'
const root = {
  boards: ''
}

const paths = {
  boards: () => `${root.boards}/`,
  board: (boardId) => `${root.boards}/boards/${boardId}`,
  login: (query = {}) => {
    const stringified = queryString.stringify(query)
    return `/login${stringified ? '?' + stringified : ''}`
  }
}

export default paths
