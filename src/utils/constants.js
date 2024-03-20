let apiRoot = ''
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-api-ysad.onrender.com'
} else {
  apiRoot = 'http://localhost:5600'
}

export const API_ROOT = apiRoot

export const SUFFIX_PLACEHOLDER_CARD = '-placeholder-card'
