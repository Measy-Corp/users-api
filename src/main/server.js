// require('dotenv').config();
const express = require('express');
const expressValidator = require('express-validator');

const app = express();
const router = express.Router();

const authRoute = require('./api/auth/route')
const userRoute = require('./api/user/route')
const ratingsRoute = require('./api/rating/route')
const storeRoute = require('./api/store/route')
const productRoute = require('./api/product/route')
const port = process.env.PORT;

app.use(express.json());
app.use('/api', authRoute);
app.use('/api', router);
app.use('/api', userRoute);
app.use('/api', ratingsRoute);
app.use('/api', storeRoute);
app.use('/api', productRoute);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});