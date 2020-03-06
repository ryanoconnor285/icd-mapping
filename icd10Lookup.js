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

const icd10Lookup = async () => {
  const requests = await conditions.map((condition, index) => {
    if (condition.icd10cm_code === "") return
    return axios
      .get(`https://icd.codes/api?f=icd10cm_code&code=` + condition.icd10cm_code)
      .then(res => {
        if (res.data.results.chapter) {
          conditions[index].chapter = res.data.results.chapter
        }

        if (res.data.results.section) {
          conditions[index].section = res.data.results.section
        }

        if (res.data.results.desc_long) {
          conditions[index].desc_long = res.data.results.desc_long
        }
      })
      .catch(err => console.error(err))
  })
  // Promise.all waits until all jobs are resolved
  Promise.all(requests)
    .then(responses => {
      writeToJson(conditions)
    });
}
icd10Lookup()
