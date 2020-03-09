const axios = require('axios')

// Method for getting all information associated with ICD 10 cm code
const icd10Lookup = async (condition) => {
  if (condition.icd10cm_code === "") {
    return condition
  }
  try {
    const response = await axios.get(`https://icd.codes/api?f=icd10cm_code&code=` + condition.icd10cm_code);
    if ( response.data.results === null ) {
      return condition
    }
    condition.icd10cm_desc = response.data.results.desc_long
    condition.parent_code = response.data.results.parent_code
    condition.section = response.data.results.section
    condition.chapter = response.data.results.chapter
    return condition
  } catch (error) {
    console.error(error);
  }
}

module.exports = icd10Lookup