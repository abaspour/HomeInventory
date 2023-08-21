const User = require('../models/User');
const jwt = require('jsonwebtoken');
//const config = require('config');

module.exports = function(req, res, next){
    // Get token from header
    const token = req.header('x-auth-token');
    // Check if not token
    if(!token){
        return res.status(401).json({errors: [{msg: 'No token, authorization denied'}]});
    }

    // Verify token
    try {
        const decoded = jwt.verify(token,"mysecret");
     //   config.get('jwtSecret'));

        req.user = decoded.user;
        User.findOne({_id: req.user.id}).then(function(user){
            if (user && user.status != 1)
                return res.status(401).json({errors: [{msg: 'User isnot active'}]});

            req.currentUser=user ;
            next();
                });
    } catch (err) {
        res.status(401).json({errors: [{msg: 'Token is not valid'}]});
    }
}