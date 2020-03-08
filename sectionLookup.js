const axios = require('axios')
const conditions = require('./conditions1.json')
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

// Want to use async/await? Add the `async` keyword to your outer function/method.
const sectionLookup = async (condition, index) => {
  if (condition.section === "") return
  try {
    const response = await axios.get(`https://icd.codes/api?f=icd10cm_chapter_sections&section=` + condition.section);
    console.log(response.data.results[0].desc)
    // conditions[index].section_desc = response.data.results.desc
    // writeToJson(conditions)
  } catch (error) {
    console.error(error);
  }
}

conditions.map((condition, index) => sectionLookup(condition, index))

