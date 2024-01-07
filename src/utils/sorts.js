export const mapOrder = (originalArray = [], orderArray = [], key = '') => {
  if (!key) return null
  return [...originalArray].sort((a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]))
}
