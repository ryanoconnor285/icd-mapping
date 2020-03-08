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
    console.log("Condtions written to conditions.json")
  })
}

const convert9to10 = async () => {
  warningCount = 0;
  const requests = await conditions.map((condition, index) => {
    if (condition.icd9v1_code === "") return
    axios
      .get(`https://icd.codes/api?f=icdcm_9_to_10&code=` + condition.icd9v1_code)
      .then(res => {
        if (res.data.results.length > 1) {
          warningCount++
          conditions[index].warning = "This ICD-9 code matches multiple ICD-10 codes, the first options was chosen by default"
        }
        conditions[index].icd9v1_desc = res.data.results[0].icd9v1_desc
        conditions[index].icd10cm_code = res.data.results[0].icd10cm_code
        conditions[index].icd10cm_desc = res.data.results[0].icd10cm_desc
        writeToJson(conditions)
      })
      .catch(err => console.error(err))
  })
  // Promise.all waits until all jobs are resolved
  Promise.all(requests)
    .then(responses => {
      console.log("Number of ICD-9 code warnings : ", warningCount, " codes matched multiple ICD-10 codes, the first ICD-10 was chosed by default.")
    });
}
convert9to10()