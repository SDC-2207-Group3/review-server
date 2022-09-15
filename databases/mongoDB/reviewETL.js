const csv = require('csv-parser');
const fs = require('fs');

const reviews = {};

//use promises to make sure all the data is here before we start putting them together
fs.createReadStream('/Users/thachdo/Documents/RFP2207/review-server/oldData/reviews.csv')
  .pipe(csv())
  .on('data', (data) => reviews[data.id] = {
    product_id: parseInt(data.product_id),
    rating: parseInt(data.rating),
    summary: data.summary,
    recommend: Boolean(data.recommend),
    response: data.response === 'null' ? null : data.response,
    body: data.body,
    date: Date(data.date),
    reported: Boolean(data.reported),
    reviewer_name: data.reviewer_name,
    helpfulness: parseInt(data.helpfulness),
    photos: []
  })
  .on('end', () => {
    for (let i = 0 ; i < 5; i++) {
      console.log(reviews[i]);
    }
  })