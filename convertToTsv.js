const fs = require('fs')
const conditions = require('./conditions1.json')


const columnDelimiter = '\t'
const lineDelimiter = '\n'


//Create labels
const keys = Object.keys(conditions[0])
const label = keys.join(columnDelimiter) + lineDelimiter

fs.writeFile("./output.tsv", label, (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log("Conditions written to output.tsv")
})

// Fill in each row
conditions.map(condition => {
  const values = Object.values(condition)
  let output;
  output = values.join(columnDelimiter) + lineDelimiter
  fs.appendFile('./output.tsv', output, (err) => {
    if (err) throw err;
  });
})

