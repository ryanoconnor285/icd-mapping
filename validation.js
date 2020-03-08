
const conditions = require('./conditions1.json')

const missingInfo = conditions.filter(condition => {
      return condition.section_desc === ""
    })
console.log(missingInfo)
console.log(missingInfo.length)