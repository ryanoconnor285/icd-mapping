const axios = require('axios')

const handleConversion = async () => {
  const res = await axios.get(`https://icd.codes/api?f=icdcm_9_to_10&code=038.9`)
  console.log(res.data.results[0].icd10cm_code);
}

module.exports = handleConversion;