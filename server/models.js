import { Review, ReviewMeta } from '../databases/mongoDB/reviewsDB.js';

const retrieve = async(product_id, page, count, cb) => {
  // need to transform the data coming back
  // change _id to review_id
  // take out product_id
  // change photos _id to id
  // we can iterate through it here in JS or use mongoDB/mongoose methods
  Review.find({"product_id": product_id}, cb).limit(count)


}


export { retrieve }

// working example using aggregation
// let filter = {product_id: parseInt(product_id)}
// let result = await Review.aggregate([{$match: filter}])
// console.log('got result', result)
// cb(null, result);