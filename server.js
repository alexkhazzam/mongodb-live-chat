const app = require('./app');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config({ path: 'dotenv.config.env' });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening to requests on port ${PORT}`.blue);
});
