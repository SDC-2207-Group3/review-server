import { Review, ReviewMeta } from '../databases/mongoDB/reviewsDB.js';

const retrieve = async(product_id, page, count, cb) => {

// working example using aggregation
let result = await Review.aggregate([
  {"$match": {product_id: product_id}},
  {"$addFields": {
    "review_id": "$_id",
    // "photos": {
    //   // need to specific path to that element, not all _id
    //   "id": "$photos._id",
    // }
  }},
  {"$limit": count},
  {"$project": {
    "_id": 0,
    "__v": 0,
    "product_id": 0,
    // photos: {
    //   _id: 0
    // }
  }},

])
// console.log('got result', result)
cb(null, result);
}


export { retrieve }


// Review.find({"product_id": product_id}, cb).limit(count)

  // need to transform the data coming back
  // change photos _id to id
  // handle page count? see what the client is expecting
  //data was inserted wrong, all reviews are reported as true