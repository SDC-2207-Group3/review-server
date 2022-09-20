import { modelGetReviews, modelGetMeta, modelPost, modelMarkHelpful, modelReportReview } from './models.js'

const getReviews = (req, res) => {
  let { product_id, count} = req.query;
  modelGetReviews(parseInt(product_id), parseInt(count), (err, result) => {
    if (err) {
      res.sendStatus(400);
    } else {
      let data = {
        product: product_id,
        // count: result.length,
        // I don't like this but this is what the Atelier API had and what the client expects
        count: parseInt(count),
        results: result
      }
      res.send(data);
    }
  })
}

const getReviewsMeta = (req, res) => {
  let { product_id } = req.query;
  modelGetMeta(parseInt(product_id), (err, result) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(result);
    }
  })
}

const postReview = (req, res) => {
  let data = req.body;
  let formmattedPhotos = [];
  for (let url of data.photos) {
    formmattedPhotos.push({url: url})
  }
  data.photos = formmattedPhotos;
  modelPost(data, (err, result) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(201)
    }
  })
}

const markHelpful = (req, res) => {
  modelMarkHelpful(req.params.review_id, (err, result) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204)
    }
  });
}

const reportReview = (req, res) => {
  modelReportReview(req.params.review_id, (err, result) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  })
}

export { getReviews, getReviewsMeta, postReview, markHelpful, reportReview }