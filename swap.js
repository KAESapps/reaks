const { autorun } = require("kobs")

//
module.exports = function(getCmp) {
  let currentCmp
  return parentNode => {
    let unmount
    const unobserve = autorun(function() {
      const cmp = getCmp()
      if (cmp === currentCmp) return
      currentCmp = cmp
      unmount && unmount()
      unmount = cmp && cmp(parentNode)
    }, "reaks/swap")

    return () => {
      unobserve()
      unmount && unmount()
      currentCmp = null // est-ce nécessaire ?
    }
  }
}
