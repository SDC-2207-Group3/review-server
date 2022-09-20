import { Review, ReviewMeta } from '../databases/mongoDB/reviewsDB.js';
import mongoose from 'mongoose';

const modelGetReviews = async(product_id, count, cb) => {
  try {
    let results = await Review.find({"product_id": product_id, reported: false}).
    limit(count);
    // need to transform photo _id to id
    // not very elegant, but good for now
    let transformedResults = [];
    for (let result of results) {
      let newResult = JSON.parse(JSON.stringify(result))
      let newPhotos = [];
      for (let photo of result.photos) {
        photo.id = photo._id.toString();
        newPhotos.push({
          id: photo._id.toString(),
          url: photo.url,
        })
      }
      newResult.photos = newPhotos;
      transformedResults.push(newResult);
    }
    cb(null, transformedResults);
  } catch (error) {
    cb(error, null)
  }
}

const modelGetMeta = async(product_id, cb) => {
  try {
    const result = await ReviewMeta.findOne({"product_id": product_id});
    let tempChars = {};
    for (let element of result.characteristics) {
      tempChars[element.name] = {
        id: element._id.toString(),
        value: element.total / element.count
      }
    }
    // RESULT keeps changing back, probably some default methods, declaring DATA and returning that instead
    let data = {
      product_id: result.product_id,
      ratings: result.ratings,
      recommended: result.recommended,
      characteristics: tempChars,
    }
    cb(null, data);
  } catch (error) {
    cb(error, null)
  }
}

const modelPost = async(data, cb) => {
// wait for all async functions to finish
// ideally, all async functions should be fire simultaneously, but how
// but at the same time, we want to make sure that the review CAN be successfully created before updating the metadata, but the client should already have that kind of validation.
  try {
    await Review.create(data);
    const result = await ReviewMeta.findOne({product_id: data.product_id});
    for (let chars in data.characteristics) {
      result.characteristics.id(chars).count += 1;
      result.characteristics.id(chars).total += data.characteristics[chars];
    }
    if (data.recommend) {
      result.recommended.true += 1;
    } else {
      result.recommended.false += 1;
    }
    result.ratings[data.rating] += 1;
    await result.save();
    cb(null, true);
  } catch (error) {
    cb(error, null)
  }

}

const modelMarkHelpful = async(review_id, cb) => {
  try {
    const review = await Review.findById(review_id);
    review.helpfulness += 1;
    await review.save();
    cb(null, true)
  } catch(error) {
    cb(error, null)
  }
}

const modelReportReview = async(review_id, cb) => {
  try {
    const review = await Review.findById(review_id);
    review.reported = true;
    await review.save();
    cb(null, true);
  } catch (error) {
    cb(error, null)
  }
}

export { modelGetReviews, modelGetMeta, modelPost, modelMarkHelpful, modelReportReview }




// ========================= REVIEW =========================
  // change photos _id to id (didn't work as a subdocument)
  // handle page count? see what the client is expecting
  // Need to handle sortBy

// ========================= PUT /reviews/:review_id/helpful =========================
// passes in review_id

// ========================= PUT /reviews/:review_id/report =========================