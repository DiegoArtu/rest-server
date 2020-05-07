
//=========================
//Port
//=========================
process.env.PORT = process.env.PORT || 3000;

//=========================
//Enviroment
//=========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=========================
//Token expiration
//=========================
// 60 seconds
// 60 minutes
// 24 hours
// 30 days
process.env.TOKEN_EXP = 60 * 60 * 24 * 30;


//=========================
//SEED 
//=========================
process.env.SEED = process.env.SEED || 'secret';

//=========================
//Data Base
//=========================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://dartcodes:NCTjF9DpGiGUkfCI@cluster0-w6lg8.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;

//mongodb://localhost:27017/cafe
//mongodb+srv://dartcodes:<password>@cluster0-w6lg8.mongodb.net/test?retryWrites=true&w=majority

//=========================
// Google Client ID
//=========================
process.env.CLIENT_ID = process.env.CLIENT_ID || '1016165529852-9oilprs9bihk8npsg4cvskm4ho7jmhhs.apps.googleusercontent.com';