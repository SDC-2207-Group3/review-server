import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import logger from './middleware/logger.js';
import { getReviews, getReviewsMeta, postReview, markHelpful, reportReview } from './controllers.js';
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config()

const app = express();

// app.use(express.json())

// middlewares
app.use(cors());
app.use(bodyParser.json())
app.use(logger)
app.use(morgan('dev'));

// routes
app.get('/reviews', getReviews)
app.get('/reviews/meta', getReviewsMeta)
app.post('/reviews', postReview)
app.put('/reviews/:review_id/helpful', markHelpful)
app.put('/reviews/:review_id/report', reportReview)
app.get('/'+ process.env.LOADER + '.txt', (req, res) => res.send(process.env.LOADER))

export default app.listen(process.env.PORT, () => [
  console.log(`WW server listening on port http://localhost:${process.env.PORT}`)
])

