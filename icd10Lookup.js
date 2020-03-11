const axios = require('axios')

// Method for getting all information associated with ICD 10 cm code
const icd10Lookup = async (condition) => {
  if (condition.icd10cm_code === "") {
    return condition
  }
  try {
    const res = await axios.get(`https://icd.codes/api?f=icd10cm_code&code=` + condition.icd10cm_code);
    condition.icd10cm_desc = res.data.results.desc_long
    condition.parent_code = res.data.results.parent_code
    condition.section = res.data.results.section
    condition.chapter = res.data.results.chapter
  } catch (error) {
    console.error(error);
  }
  return condition
}

module.exports = icd10Lookup