const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

// Allows express to be able to parse json
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/issues', require('./routes/issues'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
