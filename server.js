require('dotenv').config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 3000;

console.log(process.env.HOST, process.env.PORT);

app.listen(port, () => {
  console.log(`Server running at http://${process.env.HOST}:${port}/`);
});
