import { mongoose } from 'mongoose';
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/reviews')

const PhotoSchema = new Schema({url: String});

const ReviewSchema = new Schema({
  product_id: Number,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: Date,
  reported: Boolean,
  reviewer_name: String,
  helpfulness: Number,
  photos: {
    type: [PhotoSchema]
  }
})

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
  characteristics: {
    Size: {
      count: Number,
      total: Number
    },
    Fit: {
      count: Number,
      total: Number
    },
    Comfort: {
      count: Number,
      total: Number },
    Length: {
      count: Number,
      total: Number
    },
    Quality: {
      count: Number,
      total: Number
    },
    Width: {
      count: Number,
      total: Number
    }
  }
})

const UserSchema = new Schema({
  user_id: {
    type: Number,
    unique: true
  },
  email: String,
  name: String,
})

//declare class of reviews using schema
const Review = mongoose.model('Review', ReviewSchema);
const ReviewMeta = mongoose.model('ReviewMeta', ReviewMetaSchema);
const User = mongoose.model('User', UserSchema);

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

export { create, loadReviewData, loadMetaData, Review };

