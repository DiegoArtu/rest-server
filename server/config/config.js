
//=========================
//Puerto
//=========================

process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://dartcodes:NCTjF9DpGiGUkfCI@cluster0-w6lg8.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;

//mongodb://localhost:27017/cafe
//mongodb+srv://dartcodes:<password>@cluster0-w6lg8.mongodb.net/test?retryWrites=true&w=majority