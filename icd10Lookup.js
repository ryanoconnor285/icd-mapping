const axios = require('axios')
const conditions = require('./conditions.json')
const fs = require('fs')

// Write conditions to conditions.json.
const writeToJson = (conditions) => {
  fs.writeFile("./conditions.json", JSON.stringify(conditions, null, 4), (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log("Conditions written to conditions.json")
  })
}

// Want to use async/await? Add the `async` keyword to your outer function/method.
const icd10Lookup = async (condition, index) => {
  if (condition.icd10cm_code === "") return
  try {
    const response = await axios.get(`https://icd.codes/api?f=icd10cm_code&code=` + condition.icd10cm_code);
    conditions[index].icd10cm_desc = response.data.results.desc_long
    conditions[index].parent_code = response.data.results.parent_code
    conditions[index].section = response.data.results.section
    conditions[index].chapter = response.data.results.chapter
    writeToJson(conditions)
  } catch (error) {
    console.error(error);
  }
}

conditions.map((condition, index) => icd10Lookup(condition, index))