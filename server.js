const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: 'dotenv.config.env' });

const DEFAULT_PORT = process.env.DEFAULT_PORT || 5000;
const PORT = process.env.PORT;

const listener = (PORT_NUMBER) => {
  console.log(`Listening to requests on port ${PORT_NUMBER}`.blue);
};

app
  .listen(DEFAULT_PORT, () => {
    listener(DEFAULT_PORT);
  })
  .on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      app.listen(PORT, () => {
        listener(PORT);
      });
    }
  });
