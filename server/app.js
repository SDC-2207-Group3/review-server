const express = require('express');
const pool = require("./databases/product.db/product.db.js")
//add middleware
//consider nodemon

const app = express();
const port = 3000; //add to .env later

app.use(express.json())

// =============== PRODUCTS ROUTES ===============
app.post("/products", async(req, res) => {
  try {
    const { name, slogan, description, category} = req.body;
    const newProduct = await pool.query("INSERT INTO products (name, slogan, description, category) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, slogan, description, category]
    );
    res.json(newProduct.rows[0])
  } catch (err) {
    console.error(err.message);
  }
})

app.get("/products", async(req, res) => {
  try {
    const allProducts = await pool.query("SELECT * FROM products");
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
  }
})

app.listen(port, () => [
  console.log(`WW server listening on port ${port}`)
])