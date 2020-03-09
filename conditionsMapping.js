const conditions = require('./src/conditions-data/conditions.test.json')
const writeToJson = require('./utils/file-handling-utils/write-json')
const convert9To10 = require('./convert9to10')
const icd10Lookup = require('./icd10Lookup')

async function f() {
  console.log('Mapping Conditions, this will take a minute.')
  const updatedConditions = conditions.map(condition => icd10Lookup(condition))
  const promise = await Promise.all(updatedConditions)
  
  writeToJson(promise, './src/conditions-data/conditions.test.json')
  return promise
}
f()