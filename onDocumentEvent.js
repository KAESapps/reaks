module.exports = (event, action) => () => {
  document.addEventListener(event, action)
  return () => document.removeEventListener(event, action)
}
