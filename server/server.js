require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');


app.use( express.urlencoded({ extended: false }) );

app.use(require('../routes/users'));



mongoose.connect(process.env.URLDB,{
 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
 
})
.then( resp => console.log('base de datos ONLINE'))
.catch(err => console.log('No se pudo conectar',err));
 

app.listen( process.env.PORT, () => {
    console.log(`Listen port ` + process.env.PORT);
})

