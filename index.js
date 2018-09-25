const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const mongoose = require('mongoose');

const app = express();
const port = process.env.port || 4000;


mongoose.connect('mongodb://localhost/schoolDB');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use('/api',routes);

app.use( (err, req, res, next) => {
    res.status(422).send({ error: err.errors.name.message });
});

app.listen(port || 4000, function(){
    console.log("Now listening to requests " + port );
});