import { retrieve } from './models.js'

const getReviews = (req, res) => {
  let { product_id, page, count} = req.headers;
  retrieve(product_id, page, count, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      let data = {
        product: product_id,
        page: page,
        count: count,
        results: result
      }
      res.send(data);
    }
  })

}


export { getReviews }