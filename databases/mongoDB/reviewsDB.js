import { mongoose } from 'mongoose';
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/reviews')

const PhotoSchema = new Schema({
  url: String
});
// didn't work, might crash client with _id instead of id
// PhotoSchema.method('toJSON', function () {
//   const { __v, _id, ...object } = this.toObject();
//   // this doesn't work because it's a subdocument
//   object.id = _id;
//   return object;
// });

const ReviewSchema = new Schema({
  product_id: Number,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: Date,
  reported: {
    type: Boolean,
    default: false
  },
  reviewer_name: String,
  helpfulness: {
    type: Number,
    default: 0
  },
  photos: {
    type: [PhotoSchema]
  }
})

ReviewSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.review_id = _id;
  delete object.product_id;
  return object;
});

const ReviewMetaSchema = new Schema({
  product_id: {
    type: Number,
    unique: true
  },
  ratings: {
    1: { type: Number },
    2: { type: Number },
    3: { type: Number },
    4: { type: Number },
    5: { type: Number }
  },
  recommended: {
    true: {type: Number},
    false: {type: Number}
  },
  characteristics: [new Schema({
    count: Number,
    total: Number,
    name: String
  })]
})

//declare class of reviews using schema
const Review = mongoose.model('Review', ReviewSchema);
const ReviewMeta = mongoose.model('ReviewMeta', ReviewMetaSchema);

//define CRUD operations for this class
const create = (data) => {
  Review.create(data, (err, result) => {
    if (err) {
      console.log(err);
    }
  })
}

const loadReviewData = (data) => {
  function cb(err, result) {
    if (err) {
      console.log(err)
    } else {
      if (data.length > 0) {
        let batch = data.splice(0, 100);
        Review.insertMany(batch, cb);
      } else {
        console.log('finished loading review data!')
      }
    }
  }
  let batch = data.splice(0, 100);
  Review.insertMany(batch, cb);
}

const loadMetaData = (data) => {
  function cb(err, result) {
    if (err) {
      console.log(err)
    } else {
      if (data.length > 0) {
        let batch = data.splice(0, 100);
        ReviewMeta.insertMany(batch, cb);
      } else {
        console.log('finished loading review meta data!')
      }
    }
  }
  let batch = data.splice(0, 100);
  ReviewMeta.insertMany(batch, cb);
}

export { create, loadReviewData, loadMetaData, Review, ReviewMeta };

