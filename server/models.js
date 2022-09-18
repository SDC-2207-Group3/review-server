import { Review, ReviewMeta } from '../databases/mongoDB/reviewsDB.js';

const modelGetReviews = async(product_id, page, count, cb) => {
  Review.find({"product_id": product_id}, cb).
  limit(count)
}

const modelGetMeta = async(product_id, cb) => {
  ReviewMeta.find({"product_id": product_id}, cb);
}

const modelPost = async(data, cb) => {
  Review.create(data, cb);
}

const modelMarkHelpful = async() => {

}

const modelReportReview = async() => {

}

export { modelGetReviews, modelGetMeta, modelPost, modelMarkHelpful, modelReportReview }




// ========================= REVIEW =========================
  // change photos _id to id (didn't work as a subdocument)
  // handle page count? see what the client is expecting
  // Need to handle sortBy

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


//  ========================= POST REVIEW =========================
// incoming data uses the characteristic id

// ========================= PUT /reviews/:review_id/helpful =========================
// passes in review_id

// ========================= PUT /reviews/:review_id/report =========================