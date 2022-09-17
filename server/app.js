import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import logger from './middleware/logger.js';
import { getReviews } from './controllers.js';

const app = express();
const port = 3000; //add to .env later

app.use(express.json())
app.use(logger)

// middlewares
app.use(bodyParser.json());
// app.use(morgan('combined'));

// routes
app.get('/reviews', getReviews)





app.listen(port, () => [
  console.log(`WW server listening on port http://localhost:${port}`)
])


// incoming
// GET /reviews/
// POST /reviews
// GET /reviews/meta
// PUT /reviews/:review_id/helpful
// PUT /reviews/:review_id/report
