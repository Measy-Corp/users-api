const express = require('express');
const expressValidator = require('express-validator');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const router = express.Router();

const authRoute = require('./api/auth/route')
const userRoute = require('./api/user/route')
const ratingsRoute = require('./api/rating/route')
const storeRoute = require('./api/store/route')
const productRoute = require('./api/product/route')
const orderRoute = require('./api/order/route')
const orderItemRoute = require('./api/orderItem/route')
const port = process.env.PORT;

app.use(express.json());
app.use('/api', cors(), authRoute);
app.use('/api', cors(), router);
app.use('/api', cors(), userRoute);
app.use('/api', cors(), ratingsRoute);
app.use('/api', cors(), storeRoute);
app.use('/api', cors(), productRoute);
app.use('/api', cors(), orderRoute);
app.use('/api', cors(), orderItemRoute);

app.use(helmet());
app.use(cors());

app.options('*', cors());

app.disable('X-Powered-By');

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});