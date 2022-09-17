import { retrieve } from './models.js'

const getReviews = (req, res) => {
  let { product_id, page, count} = req.headers;
  retrieve(parseInt(product_id), parseInt(page), parseInt(count), (err, result) => {
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


export { getReviews }