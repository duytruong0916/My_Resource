const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const routes = require('./modules/routes');
const app = express();

mongoose.connect("mongodb://localhost/Items");
mongoose.Promise= global.Promise;

app.use('', routes);
app.use(bodyParse.json());      
app.set('view engine','ejs'); //for the template enigne
app.use(express.static('./public'));


const PORT = process.env.PORT || 3000 ;
app.listen(process.env.PORT || 3000, () => console.log(`Server started on PORT ${PORT}`));

