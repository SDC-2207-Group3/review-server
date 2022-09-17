import { Review, ReviewMeta } from '../databases/mongoDB/reviewsDB.js';

const retrieve = async(product_id, page, count, cb) => {
  // need to transform the data coming back
  // change _id to review_id
  // take out product_id
  // change photos _id to id
  // we can iterate through it here in JS or use mongoDB/mongoose methods
  Review.find({"product_id": product_id}, cb)
}


export { retrieve }
