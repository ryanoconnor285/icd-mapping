const fs = require('fs')
const d3 = require('d3')

// Store Conditions
let conditions = [
  {
        icd9v1_code: "0389",
        icd9v1_desc: "Unspecified septicemia",
        icd10cm_code: "A419",
        icd10cm_desc: "Sepsis, unspecified organism",
        chapter: "1",
        section: "A30-A49",
        section_desc: "Other bacterial diseases"
      }
]
// Final Array should be list of objects with following values

// const conditionsFinal = [
//   {
//     icd9v1_code: "0389",
//     icd9v1_desc: "Unspecified septicemia",
//     icd10cm_code: "A419",
//     icd10cm_desc: "Sepsis, unspecified organism",
//     chapter: "1",
//     section: "A30-A49",
//     section_desc: "Other bacterial diseases"
//   }
// ]

// Write to conditions.json.
const appendConditions

// Get Conditions from tsv named input.tsv in root directory.  
// ICD naming convention for both ICD 9 and 10 have a decimal after the third character but the API does not use this decimal. 
const getConditions = () => {
  fs.readFile("./input1.tsv", "utf8", function (error, data) {
    data = d3.tsvParse(data);
    data.map(item => {
      if (item.source === "http://hl7.org/fhir/sid/icd-9-cm") {
        conditions
          .push({ 
            icd9v1_code: item.code.replace('.', ''), 
            icd10cm_code: "" 
          })
      }

      if (item.source === "http://hl7.org/fhir/sid/icd-10-cm") {
        conditions
          .push({ 
            icd9v1_code: "", 
            icd10cm_code: item.code.replace('.', '') 
          })
      }
    })
  })
}
getConditions()

module.exports = getConditions