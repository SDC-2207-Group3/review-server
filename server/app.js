import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import logger from './middleware/logger.js';
import { getReviews, getReviewsMeta, postReview, markHelpful, reportReview } from './controllers.js';
import cors from 'cors';

const app = express();
const port = 4000; //add to .env later

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

app.listen(port, () => [
  console.log(`WW server listening on port http://localhost:${port}`)
])


// incoming
// GET /reviews/
// POST /reviews
// GET /reviews/meta
// PUT /reviews/:review_id/helpful
// PUT /reviews/:review_id/report
