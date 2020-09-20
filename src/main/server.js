// require('dotenv').config();
const express = require('express');
const expressValidator = require('express-validator');

const app = express();
const router = express.Router();

const userRoute = require('./api/routes/user')
const port = process.env.PORT;

app.use(express.json());
app.use('/api', router);
app.use('/api', userRoute);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});