const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const d3 = require('d3');

fs.readFile("./input.tsv", "utf8", function(error, data) {
  data = d3.tsvParse(data);
  data.map(item => 
    console.log(item)
  );
});

app.listen(port, () => console.log(`App listening on port ${port}!`))