import { mongoose } from 'mongoose';
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/reviews')

const PhotoSchema = new Schema({url: String});

const ReviewSchema = new Schema({
  product_id: Number,
  rating: Number,
  summary: String,
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
  recommended: Boolean,
  characteristics: {
    size: {
      count: Number,
      total: Number
    },
    fit: {
      count: Number,
      total: Number
    },
    comfort: {
      count: Number,
      total: Number },
    length: {
      count: Number,
      total: Number
    },
    quality: {
      count: Number,
      total: Number
    },
    width: {
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

export { create, insertMany, Review };

