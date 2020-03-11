const axios = require('axios')

const convert9to10 = async (condition) => {
  if (condition.icd9v1_code === "") {
    return condition
  }
  try {
    const res = await axios.get(`https://icd.codes/api?f=icdcm_9_to_10&code=` + condition.icd9v1_code)
    condition.icd9v1_desc = res.data.results[0].icd9v1_desc
    condition.icd10cm_code = res.data.results[0].icd10cm_code
    condition.icd10cm_desc = res.data.results[0].icd10cm_desc
  } catch (error) {
    console.log("There was an error with convert9to10", error)
  }
  return condition
}

module.exports = convert9to10