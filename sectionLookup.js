const axios = require('axios')

const sectionLookup = async (condition) => {
  if (condition.section === "") {
    return condition
  }
  try {
    const res = await axios.get(`https://icd.codes/api?f=icd10cm_chapter_sections&section=` + condition.section);
    condition.section_desc = res.data.results[0].desc
  } catch (error) {
    console.error(error);
  }
  return condition
}

module.exports = sectionLookup

