const fs = require('fs')
const directories = require('../../config/directories')

/** 
 * Write an array of objects to json file.
 * Takes in two inputs
 *    1) conditions, an array of json objects 
 *    2) outputFile is a string.  This is set from /config/directories 
**/

const outputFile = directories.conditions_json

const writeToJson = (conditions, outputFile) => {
  fs.writeFile(outputFile, JSON.stringify(conditions, null, 4), (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log("Condtions written to", outputFile)
    console.log("Added",  conditions.length, "conditions")
  })
}

module.exports = writeToJson