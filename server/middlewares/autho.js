const jwt = require('jsonwebtoken');

//===================
//Token Verification
//===================
let verifToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify( token, process.env.SEED, (err, decoded) =>{

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        req.user = decoded.user;

    })

    next();

}

//===================
//Admin Verification
//===================
let verifAdminRole = (req, res, next) => {
    let user = req.user;

    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'User no Admin'
            }
        })
    }

}

module.exports = {
    verifToken,
    verifAdminRole
}