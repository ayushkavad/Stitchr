const express = require('express');
require('dotenv').config({ path: './cofing.env' });

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'hello from the scribblr',
  });
});

app.listen(port, () => {
  console.log(`Server running at http://${process.env.HOST}:${port}/`);
});
