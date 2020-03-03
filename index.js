const express = require('express')
const app = express()
const port = 3000

app.get('/https://www.icd10data.com/Convert/034.0', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App listening on port ${port}!`))