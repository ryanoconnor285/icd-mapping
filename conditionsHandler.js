const fs = require('fs')
const d3 = require('d3')

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

// Get Conditions from tsv named input.tsv in root directory.  
// ICD naming convention for both ICD 9 and 10 have a decimal after the third character but the API does not use this decimal. 
fs.readFile("./input.tsv", "utf8", (error, data) => {

  if (error) {
    console.error(error)
    return;
  };

  let conditions = []
  data = d3.tsvParse(data)
  data.map(item => {
    if (item.source === "http://hl7.org/fhir/sid/icd-9-cm") {
      conditions
        .push({
          "icd9v1_code": item.code.replace(".", ""),
          "icd9v1_desc": "",
          "icd10cm_code": "",
          "icd10cm_desc": "",
          "chapter": "",
          "section": "",
          "section_desc": "",
          "warning": ""
        })
    }

    if (item.source === "http://hl7.org/fhir/sid/icd-10-cm") {
      conditions
        .push({
          "icd9v1_code": "",
          "icd9v1_desc": "",
          "icd10cm_code": item.code.replace(".", ""),
          "icd10cm_desc": "",
          "chapter": "",
          "section": "",
          "section_desc": "",
          "warning": ""
        })
    }
  })
  console.log("Parsed input.tsv")
  writeToJson(conditions)
})

module.exports = writeToJson