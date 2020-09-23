// require('dotenv').config();
const express = require('express');
const expressValidator = require('express-validator');

const app = express();
const router = express.Router();

const userRoute = require('./api/routes/user')
const storeRoute = require('./api/routes/store')
const productRoute = require('./api/routes/product')
const port = process.env.PORT;

app.use(express.json());
app.use('/api', router);
app.use('/api', userRoute);
app.use('/api', storeRoute);
app.use('/api', productRoute);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});