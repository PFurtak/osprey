const express = require('express');

const app = express();

app.use('/', (req, res) => {
  res.send('Welcome to express!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
