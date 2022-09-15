const express = require('express');

const app = express();
const port = 3000; //add to .env later

app.use(express.json())

app.listen(port, () => [
  console.log(`WW server listening on port ${port}`)
])