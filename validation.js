
const conditions = require('./src/conditions-data/conditions.test.json')

const missingInfo = conditions.filter(condition => {
      return condition.icd10cm_code === ""
    })
console.log(missingInfo)
console.log(missingInfo.length)