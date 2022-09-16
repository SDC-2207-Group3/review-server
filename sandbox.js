import Promise from 'bluebird';
import { create, insertMany, Review } from './databases/mongoDB/reviewsDB.js'


let data1 = {
  product_id: 5,
  rating: 3,
  summary: "Buy this",
  response: "I like it, I buy it",
  date: 'Thu Sep 15 2022 11:37:40 GMT-0700 (Pacific Daylight Time)',
  reported: false,
  reviewer_name: 'takattack',
  helpfulness: 25,
  photos: [{url:'sdf.com'}, {url:'q35.com'}]
}

let data2 = {
  product_id: 7,
  rating: 2,
  summary: "Buy tsdfsdfhis",
  response: "I like sadgdsgit, I buy it",
  date: 'Thu Sep 15 2022 11:37:40 GMT-0700 (Pacific Daylight Time)',
  reported: true,
  reviewer_name: 'takasadfttack',
  helpfulness: 35,
  photos: [{url:'sdsadff.com'}, {url:'q3asdg5.com'}]
}

let data3 = {
  product_id: 9,
  rating: 2,
  summary: "Buy tssadggddfsdfhis",
  response: "I likesdgsdg sadgdsgit, I buy it",
  date: 'Thu Sep 15 2022 11:37:40 GMT-0700 (Pacific Daylight Time)',
  reported: true,
  reviewer_name: 'takasasgadfttack',
  helpfulness: 35,
  photos: [{url:'sdsavbdff.com'}, {url:'q3aszxcdg5.com'}]
}
let sampleData = [data1, data2, data3]

const createAsync = async(data) => {
  console.log(data);
  await insertMany(data);
  console.log('done')
  await insertMany(data);
}
createAsync(sampleData);

// create([data1, data2, data3])
// let createPromise = Promise.promisify(create);
// createPromise(data1)
//   .then((result) => {
//     console.log('done with data1, result:', result);
//     return createPromise(data2);
//   })
//   .then(() => console.log('done'))

//this is a working example of turning a series of async function calls into something synchronous
// let myFunc = function(data, callback) {
//   // make the result async
//   setTimeout(function() {
//       // call the callback with the node style calling convention
//       callback(0, data);
//   }, 1000);
// }

// let myFuncAsync = Promise.promisify(myFunc);

// myFuncAsync('hello1')
// .then((result) => {
//   console.log(result)
//   return myFuncAsync('hello2')
// })
// .then((result) => {
//   console.log(result)
//   return myFuncAsync('hello3')
// })
// .then((result) => {
//   console.log(result)
//   return myFuncAsync('hello4')
// })
// .then((result) => {
//   console.log(result)
//   return myFuncAsync('hello5')
// })

// const shout = new Promise((resolve) => {
//   setTimeout(() => console.log('hi'), 1000);
//   resolve('done');
// })


// shout.then((data) => console.log('message', data))