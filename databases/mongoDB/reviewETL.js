const csv = require('csv-parser');
const fs = require('fs');
const results = [];

fs.createReadStream('/Users/thachdo/Documents/RFP2207/rfp2207-fec/oldData/characteristic_reviews.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results.slice(0, 5));
  })