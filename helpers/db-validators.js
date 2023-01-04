const Role = require('../models/role');
const User = require('../models/users');

const isRoleValid = async (role = '') => {
    const roleExists = await Role.findOne({ role });

    if( ! roleExists ) throw new Error('The role does not exists');
};

const emailExists = async ( email = '' ) => {
    // check if email already exists
    const userExists = await User.findOne( { email } );

    if( userExists ) throw new Error('User already exists');

};


const idExists = async ( id ) => {
    /**
     * id : {
     *  bla bla bla
     * }
     */
    const idExists = await User.findById( id );
    if( !idExists ) throw new Error('User ID does not exists');
};

module.exports = {
    isRoleValid,
    emailExists,
    idExists
};