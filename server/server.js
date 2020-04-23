const express = require('express');
const app = express();

app.use( express.urlencoded({ extended: false }) )

app.get( '/user', ( req, res ) => {
    res.json('Get User please');
})

app.post( '/user', ( req, res ) => {

    let body = req.body

    res.json({
        body
    });
})

app.put( '/user/:id', ( req, res ) => {

    let id = req.params.id;
    res.json({
        id,
    });
})

app.delete( '/user', ( req, res ) => {
    res.json('Delete User');
})

app.listen( process.env.PORT, () => {
    console.log(`Listen port ${ process.env.PORT }`);
})