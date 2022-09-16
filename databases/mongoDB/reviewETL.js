import csv from 'csv-parser';
import fs from 'fs';
import Promise from 'bluebird';
import neatCsv from 'neat-csv';
import { loadReviewData, loadMetaData, Review } from './reviewsDB.js'

let reviews = {};
let metaData = {};
//temp object for characteristics_review csv to reference
let chars = {};

fs.createReadStream('/Users/thachdo/Documents/RFP2207/review-server/oldData/characteristics.csv')
  .pipe(csv())
  .on('data', (data) => {
    // will need to reference characteristics obj later
    chars[data.id] = {
      product_id: data.product_id,
      name: data.name
    }
    // start shaping and populating metaData
    metaData[data.product_id] = metaData[data.product_id] || {
      product_id: data.product_id,
      ratings: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      },
      recommended: {
        true: 0,
        false: 0
      },
      characteristics: {}
    }
    metaData[data.product_id]['characteristics'][data.name] = {count: 0, total: 0}
  })
  .on('end', () => {
    console.log('finished extracting characteristics.csv')
    fs.createReadStream('/Users/thachdo/Documents/RFP2207/review-server/oldData/characteristic_reviews.csv')
    .pipe(csv())
    .on('data', (data) => {
      let product_id = chars[data.characteristic_id].product_id;
      let name = chars[data.characteristic_id].name;
      // agument metaData object
      metaData[product_id]['characteristics'][name]['count'] += 1;
      metaData[product_id]['characteristics'][name]['total'] += parseInt(data.value);

    })
    .on('end', () => {
      console.log('finished extracting characteristics_reviews.csv')
      // let metaDataValues = Object.values(metaData);
      // console.log(metaDataValues.slice(0, 20));
      fs.createReadStream('/Users/thachdo/Documents/RFP2207/review-server/oldData/reviews.csv')
        .pipe(csv())
        .on('data', (data) => {
          // populate reviews obj
          reviews[data.id] = {
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
          }
          //agument metadata object
          metaData[data.product_id].ratings[parseInt(data.rating)] += 1;
          metaData[data.product_id].recommended = metaData.recommended || {
            false: 0,
            true: 0
          }
          metaData[data.product_id].recommended[data.recommend] += 1;
        })
        .on('end', () => {
          console.log('finished extracting reviews.csv')
          fs.createReadStream('/Users/thachdo/Documents/RFP2207/review-server/oldData/reviews_photos.csv')
            .pipe(csv())
            .on('data', (data) => reviews[data.review_id].photos.push({url: data.url}))
            .on('end', () => {
              console.log('finished extracting reviews_photos.csv')
              let reviewData = Object.values(reviews);
              let metaDataValues = Object.values(metaData);
              loadMetaData(metaDataValues);
              loadReviewData(reviewData);
            })
        })
    })
  })



// example of inserting hard coded data
// create({
//   product_id: 5,
//   rating: 3,
//   summary: "Buy this",
//   response: "I like it, I buy it",
//   date: 'Thu Sep 15 2022 11:37:40 GMT-0700 (Pacific Daylight Time)',
//   reported: false,
//   reviewer_name: 'takattack',
//   helpfulness: 25,
//   photos: [{url: 'sdf.com'}, {url: 'q35.com'}]
// })