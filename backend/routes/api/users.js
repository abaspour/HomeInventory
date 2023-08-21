const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
var nodemailer = require('nodemailer'); 
const { mailtransport, plainEmailTemplate } = require('../../utils/sendEmail');

//  @route  POST api/users
//  @desc   Register user
//  @access Public
router.post('/', [
    check('firstName', 'Name is Rquired').isString().notEmpty(),
    check('lastName', 'Name is Rquired').isString().notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phoneNumber')
    .isNumeric().withMessage('Please include a valid phone number')
    .isLength({min: 5, max: 10})
    .withMessage("your phone number should have min and max length between 5-10"),
    check('password').isLength({ min: 8, max: 15 })
    .withMessage("your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one special character")
    .matches(/[\a-\z]/)
    .withMessage("your password should have at least one lowercase character")
    .matches(/[\A-\Z]/)
    .withMessage("your password should have at least one uppercase character"),
    
],
async (req, res) => {
    const errors =validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {firstName, lastName, email, phoneNumber, password} = req.body;

    try {
    // See if user exists
        let user = await User.findOne({email});
        if(user)
        {
            return res.status(400).json({errors: [{msg: 'User already exists'}]});
        }   
        
        user = new User({
            firstName,
            lastName,
            email, 
            phoneNumber,           
            password,
            status:1, 
            role:1            
        });

    // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        user= await user.save();
    
        mailtransport().sendMail({
            from: 'emailverification@example.com',
            to: 'abbaspourmahdiyeh@gmail.com',
            subject: "Welcome to HOME nVentory",
            html: plainEmailTemplate("Email verified", "Thank you")
        }, (err, info) => {
            console.log(err);
            console.log(info.envelope);
            console.log(info.messageId);
        });

    // Return jasonwebtoken
       const payload = {
        user: {
            id: user.id,
        }
       }
//        config.get('jwtSecret'),

       jwt.sign(
        payload, 
        "mysecret",
        {expiresIn: 360000},
        (err, token) => {
            if(err)
            {
                throw err;
            }
            else
            {   user.password=''
                res.json({token,user});
            }
        });    
} catch (err) {
        console.error(err.message);
        res.status(500).json({ errors:[{ msg :'Server Error'} ] } );
    }
    
});

// admin could get all accounts
router.get('/',auth, async (req, res) => {
    try {
        const errors =validationResult(req);
        if ( req.currentUser.role===1 ) {
            res.status(500).json({errors: 
                [{msg: "Can not get all Accounts only admin could"}]})
            return;                
        }
        const users = await User.find()
        .then(users => res.json(users) );
    } catch (error) {
        console.error(err.message);
        res.status(500).json({ errors:[{ msg :'Server Error'} ] } );
    }
});
router.get('/:id',auth, async (req, res) => {
    try {
        const errors =validationResult(req);
        if (req.params.id==='undefined'){
            try {
                const errors =validationResult(req);
                const users = await User.findOne({_id:req.currentUser._id})
                .then(users => res.json(users) );
            } catch (error) {
                console.error(err.message);
                res.status(500).json({ errors:[{ msg :'Server Error'} ] } );
            }
            return;
        
        }
        if (req.params.id !== String(req.currentUser._id) && req.currentUser.role===1 ) {
            res.status(400).json({errors: 
                [{msg: "Please Request Administrator to update the account"}]})
            return;                
        }
        const user = await User.findById(req.params.id)
        .then(user => res.json(user) );
    } catch (error) {
        console.error(err.message);
        res.status(500).json({ errors:[{ msg :'Server Error'} ] } );
    }
});

module.exports = router;
