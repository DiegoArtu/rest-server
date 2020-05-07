require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use( express.urlencoded({ extended: false }) );

//Enable Public Folder
app.use(express.static(path.resolve(__dirname, '../public')));

//Global Routes Configuration 
app.use(require('./routes/index'));

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

