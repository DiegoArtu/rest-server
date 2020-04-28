const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const app = express();


app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({email: body.email})
        .then( userDB => {

            if (!userDB) {
                return res.status(400).json({
                    ok:false,
                    err: {
                        message: '(User) or Password incorrect'
                    }
                })    
            }

            if (!bcrypt.compareSync( body.password, userDB.password )) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'User or (password) incorrect'
                    }
                })
            }

            let token = jwt.sign({
                user: userDB,

            }, process.env.SEED, { expiresIn: process.env.TOKEN_EXP})

            res.json({
                ok: true,
                user: userDB,
                token
            })

        })
        .catch( err => {
            return res.status(500).json({
                ok:false,
                err
            })
        })
});

module.exports = app;
