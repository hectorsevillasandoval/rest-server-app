const bcrypt = require('bcryptjs');
const User = require('../models/users');
const authUtils = require('../helpers/generate.jwt');

const login = async ( req, res ) => {
    const errorMessage = 'User/Password not valid';
    const { email, password } = req.body;

    try{

    // TODO: Check if email exists

    const user = await User.findOne( { email } );

    if( !user ) return res.status( 400 ).json( { msg: `${errorMessage} - email` } );

    // TODO: Check if user is active
    if( !user.status ) return res.status( 400 ).json( { msg: `${errorMessage} - status:false` } );

    // TODO: Check Password
    const validPassword = bcrypt.compareSync( password, user.password );

    if(!validPassword ) return res.status( 400 ).json( { msg: `${errorMessage} - password:incorrect password` } );

    // TODO: Generate Web Token

    const token = await authUtils.generateJWT( user.id );

        res.json({
            msg: 'login ok',
            token
        });

    }catch( err ){
        console.log( err );
        res.status( 500 ).send( { success: false, message: err.message } );
        return;
    }

}

module.exports = { login };