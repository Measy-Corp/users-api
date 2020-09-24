// require('dotenv').config();
const express = require('express');
const expressValidator = require('express-validator');

const app = express();
const router = express.Router();

const authRoute = require('./api/auth/routes')
const userRoute = require('./api/routes/user')
const ratingsRoute = require('./api/routes/rating')
const storeRoute = require('./api/routes/store')
const productRoute = require('./api/routes/product')
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