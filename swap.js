const { autorun } = require("ks-data/obs")

module.exports = function(getCmp) {
  return parentNode => {
    let unmount
    const unobserve = autorun(function() {
      unmount && unmount()
      const cmp = getCmp()
      unmount = cmp && cmp(parentNode)
    }, "reaks/swap")

    return () => {
      unobserve()
      unmount && unmount()
    }
  }
}
