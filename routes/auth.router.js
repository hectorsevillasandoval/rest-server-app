const { Router } = require('express');
const { check } = require('express-validator');
const validateFields = require('../middlewares/field-validator.middleware');

const loginController = require('../controllers/auth.controller');


const router = Router();

router
    .post('/login', [
        check('password', 'password is required')
            .notEmpty(),
        check('email', 'Email is required')
            .isEmail(),
        validateFields,
    ],loginController.login);


module.exports = router;