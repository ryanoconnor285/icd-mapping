const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const d3 = require('d3')
const Table = require('cli-table')

let conditions = []

fs.readFile("./input.tsv", "utf8", function(error, data) {
  data = d3.tsvParse(data);
  data.map(item => 
    console.log(item)
  )
})

//This is what the final tsv output should look like
//
// 034.0    J020    Acute pharyngitis                 J00-J06    Acute upper respiratory infections
//          M10.09  Idiopathic gout, multiple sites   M05-M14    Inflammatory polyarthropathies

// const final = [
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

app.listen(port, () => console.log(`App listening on port ${port}!`))