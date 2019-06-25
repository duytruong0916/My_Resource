const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');


const app = express();  //set up express app
app.use(morgan('dev'));
//connect mongoose
mongoose.connect('mongodb://localhost:27017/Store', {useNewUrlParser: true}, (err)=>{
    if(err){
        console.log('ERROR WHEN CONNECTING: ' + err)
          }
    else {
        console.log('you are connected to the database server')
         }
});
mongoose.Promise= global.Promise;
app.use(bodyParse.json());      //middleware for post method
app.use(express.static(__dirname + '/public'));
app.use('/api', require('./routes/api'));//Initialize routes


//listening for requests
const PORT = process.env.PORT || 5000 ;
app.listen(process.env.PORT ||5000, () => console.log(`Server started on PORT ${PORT}`));