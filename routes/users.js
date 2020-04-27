const express = require('express');
const app = express();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.get( '/user', ( req, res ) => {

    let from = req.query.from || 0;
    from = Number(from);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    User.find({status: true})
        .skip(from)
        .limit(limite)
        .exec()
        .then( (users) => {

            User.count({status: true}).then( (count) => res.json({
                ok:true,
                users,
                count: count
            }))

        })
        .catch( (err) =>{
            res.status(400).json({
                ok: false,
                err
            })
        })

})

app.post( '/user', ( req, res ) => {

    let body = req.body;

    console.log(body);

    let user = new User({
        name     : body.name,
        email    : body.email,
        password : bcrypt.hashSync(body.password, 10) ,
        role     : body.role       
    });

    console.log(user);

    user.save().then((usuarioDB)=>{
        //console.log("Guardado correctamente", usuarioDB)

        usuarioDB.password = 'Encrypted';

        res.json({
            ok:true,
            user:usuarioDB
        })
 
    })
    .catch((err)=>res.json({
        ok: false,
        err
    }))
})

app.put( '/user/:id', ( req, res ) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']); 

    User.findByIdAndUpdate( id, body, {new: true}).then(userDB => {

        res.json({
            ok: true,
            user: userDB
        })
    })
    .catch( err => res.json({
        ok:false,
        err
    }))

})

app.delete( '/user/:id', ( req, res ) => {

    let id = req.params.id;
    let statusFalse = {
        status: false
    }

    //User.findByIdAndRemove(id)
    User.findByIdAndUpdate(id, statusFalse, {new: true})
        .then( userDelete => {
            if (!userDelete) {
                res.json({
                    ok:false,
                    error: {
                        message: 'User not found'
                    }
                })
            } else {
                res.json({
                    ok:true,
                    user: userDelete
                })    
            }
            

        })
        .catch( err => {
            console.log(err);
            if (err) {
                res.status(400).json({
                    ok:false,
                    err
                })
            }
        })
})

module.exports = app;