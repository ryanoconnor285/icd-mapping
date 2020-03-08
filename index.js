const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

const conditions = require('./conditions1.json')

const missingInfo = conditions.filter(condition => {
      return condition.section_desc === ""
    })
console.log(missingInfo)
console.log(missingInfo.length)

app.listen(port, () => console.log(`App listening on port ${port}!`))