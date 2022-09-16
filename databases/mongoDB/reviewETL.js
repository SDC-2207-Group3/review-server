import csv from 'csv-parser';
import fs from 'fs';
import Promise from 'bluebird';
import neatCsv from 'neat-csv';
import { create, insertMany, Review } from './reviewsDB.js'

const reviews = {};

// use promises to make sure all the data is here before we start putting them together?
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
    console.log('finished extracting reviews.csv')
    fs.createReadStream('/Users/thachdo/Documents/RFP2207/review-server/oldData/reviews_photos.csv')
      .pipe(csv())
      .on('data', (data) => reviews[data.review_id].photos.push({url: data.url}))
      .on('end', () => {
        console.log('finished extracting reviews_photos.csv')

        let data = Object.values(reviews);

        const insertManyAsync = async(data) => {
          for (let i = 0; i < data.length; i++) {
            await insertMany(data[i])
          }
        }
        insertManyAsync(data);


      })
  })



        // const processData = async(reviews) => {
        //   for (let review in reviews) {
        //     let result = await createPromise(reviews[review]);
        //     console.log(result);
        //     console.log('done processing review:', review)
        //   }
        // }

        // processData(reviews);


        // const processData = async(reviews) => {
        //   let toInsert = [];
        //   for (let review in reviews) {
        //     toInsert.push(reviews[review]);
        //     if(toInsert.length >= 100) {
        //       await bulkPromise(toInsert);
        //       toInsert = [];
        //     }
        //   }
        // }
        // processData(reviews);
        // asyncInsert(0, transformedData);
        // insertMany(transformedData.slice(0, 10));
        // insertMany(Object.values(reviews));


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