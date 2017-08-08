module.exports = (event, action) => (parentNode) => {
  parentNode.addEventListener(event, action)
  return () => parentNode.removeEventListener(event, action)
}
