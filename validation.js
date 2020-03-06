
const conditions = require('./conditions.json')

const missingInfo = conditions.filter(condition => {
      return condition.section === "" || condition.section_desc === "" || condition.chapter === ""
    })
console.log(missingInfo)
console.log(missingInfo.length)