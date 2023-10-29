const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const userRouters = require('./routes/userRoutes');
const markerRouters = require('./routes/markerRoutes');
require('dotenv').config();

const app = express();


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// routes middleware
app.use("/api/user", userRouters);
app.use("/api/marker", markerRouters)

mongoose.connect(process.env.MONGO_URL).then(() => console.log('Database Connected'))


app.listen(process.env.PORT || 4000, () => {
    console.log('Server listening on port 4000')
})