import { Review, ReviewMeta } from '../databases/mongoDB/reviewsDB.js';

const retrieveReviews = async(product_id, page, count, cb) => {
  Review.find({"product_id": product_id}, cb).limit(count)
}

const retrieveReviewsMeta = async(product_id, cb) => {
  ReviewMeta.find({"product_id": product_id}, cb);
}

const modelPost = async() => {

}

export { retrieveReviews, retrieveReviewsMeta, modelPost }




// ========================= REVIEW =========================
  // change photos _id to id (didn't work as a subdocument)
  // handle page count? see what the client is expecting

  // // working example using aggregation
// let result = await Review.aggregate([
//   {"$match": {product_id: product_id}},
//   {"$addFields": {
//     "review_id": "$_id",
//     // "photos": {`
//     //   // need to specific path to that element, not all _id
//     //   "id": "$photos._id",
//     // }
//   }},
//   {"$limit": count},
//   {"$project": {
//     "_id": 0,
//     "__v": 0,
//     "product_id": 0,
//     // photos: {
//     //   _id: 0
//     // }
//   }},

// ])
// // console.log('got result', result)
// cb(null, result);
// }


//  ========================= REVIEW META NEED FIXES =========================
// potential: does each characteristic need their id?
// value needs to be computed from total and count
// method 1: calculate that while processing a get request
// method 2: find and update an average during a post request