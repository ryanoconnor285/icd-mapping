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

const getSectionsInfo = async () => {
  const requests = await conditions.map((condition, index) => {
    return axios
      .get(`https://icd.codes/api?f=icd10cm_chapter_sections&section=` + condition.section)
      .then(res => {
        conditions[index].section_desc = res.data.results[0].desc
      })
      .catch(err => console.error(err))
  })
  // Promise.all waits until all jobs are resolved
  Promise.all(requests)
    .then(responses => writeToJson(conditions));
} 
getSectionsInfo()

// const handleSectionLookup = async () => {
//   // Filter array for conditons which have an icd 9 code
//   const missingSectionInfo = conditions.filter(condition => {
//     return condition.section != "" && condition.section_desc === ""
//   })
//   console.log(missingSectionInfo)
//   getSectionsInfo(missingSectionInfo)
// }
// handleSectionLookup()
