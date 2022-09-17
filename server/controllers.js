import { retrieveReviews, retrieveReviewsMeta, modelPost } from './models.js'

const getReviews = (req, res) => {
  let { product_id, page, count} = req.headers;
  retrieveReviews(parseInt(product_id), parseInt(page), parseInt(count), (err, result) => {
    if (err) {
      res.send(err);
    } else {
      let data = {
        product: product_id,
        page: parseInt(page),
        count: result.length,
        results: result
      }
      res.send(data);
    }
  })
}

const getReviewsMeta = (req, res) => {
  let { product_id } = req.headers;
  retrieveReviewsMeta(parseInt(product_id), (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })

}

const postReview = (req, res) => {

}


export { getReviews, getReviewsMeta, postReview }