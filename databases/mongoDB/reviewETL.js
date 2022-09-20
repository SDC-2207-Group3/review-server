import csv from 'csv-parser';
import fs from 'fs';
import Promise from 'bluebird';
import neatCsv from 'neat-csv';
import { loadReviewData, loadMetaData, Review } from './reviewsDB.js'

let datafolder = 'oldData';
// let datafolder = 'sampleData';
let reviews = {};
let metaData = {};
//temp object for characteristics_review csv to reference
let chars = {};

fs.createReadStream(`/Users/thachdo/Documents/RFP2207/review-server/${datafolder}/characteristics.csv`)
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
      characteristics: []
    }
    metaData[data.product_id]['characteristics'].push({name: data.name, count: 0, total: 0});
  })
  .on('end', () => {
    console.log('finished extracting characteristics.csv')
    // console.log('review', reviews);
    // console.log('metaData', metaData['1'].characteristics);
    // console.log('chars', chars);
    fs.createReadStream(`/Users/thachdo/Documents/RFP2207/review-server/${datafolder}/characteristic_reviews.csv`)
    .pipe(csv())
    .on('data', (data) => {
      let product_id = chars[data.characteristic_id].product_id;
      let name = chars[data.characteristic_id].name;
      // agument metaData object
      let charsList = metaData[product_id]['characteristics'];
      for (let char of charsList) {
        if (char.name === name) {
          char.count += 1;
          char.total += parseInt(data.value);
        }
      }
    })
    .on('end', () => {
      console.log('finished extracting characteristics_reviews.csv')
      // let metaDataValues = Object.values(metaData);
      // console.log(metaDataValues.slice(0, 20));
      fs.createReadStream(`/Users/thachdo/Documents/RFP2207/review-server/${datafolder}/reviews.csv`)
        .pipe(csv())
        .on('data', (data) => {
          // populate reviews obj
          reviews[data.id] = {
            // delete previous review_id to use Objectid
            // review_id: parseInt(data.id),
            product_id: parseInt(data.product_id),
            rating: parseInt(data.rating),
            summary: data.summary,
            recommend: data.recommend === 'true' ? true : false,
            response: data.response === 'null' ? null : data.response,
            body: data.body,
            date: (data.date === 'null' || data.date === 'undefined' || data.date === undefined) ?  new Date('Tue Sep 20 2022 12:28:48 GMT-0700 (Pacific Daylight Time)') : new Date(parseInt(data.date)),
            reported: data.reported === 'true' ? true : false,
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
          fs.createReadStream(`/Users/thachdo/Documents/RFP2207/review-server/${datafolder}/reviews_photos.csv`)
            .pipe(csv())
            .on('data', (data) => reviews[data.review_id].photos.push({
              url: data.url,
              // id: parseInt(data.id)
            }))
            .on('end', () => {
              console.log('finished extracting reviews_photos.csv')
              let reviewData = Object.values(reviews);
              let metaDataValues = Object.values(metaData);
              // console.log(reviewData[0]);
              // console.log(metaDataValues[0]);
              loadMetaData(metaDataValues);
              loadReviewData(reviewData);
            })
        })
    })
  })