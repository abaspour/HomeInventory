const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const {check, validationResult} = require('express-validator');
var fs = require('fs');
const Inventory = require('../../models/inventory');
// const config = require('config');
const picURI =  "./nodejs_pic/"; //config.get('picURI');

router.post('/update/:id',
[
    check('firstName', 'Name is Rquired').isString().notEmpty(),
    check('lastName', 'Name is Rquired').isString().notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phoneNumber')
    .isNumeric().withMessage('Please include a valid phone number')
    .isLength({min: 5, max: 10})
    .withMessage("your phone number should have min and max length between 5-10")    
],auth, async (req, res) => {
    try {
        if (req.params.id !== String(req.currentUser._id) && req.currentUser.role===1 ) {
            res.status(400).json({errors: 
                [{msg: "Please Request Administrator to update the account"}]})
            return;                
        }
        const errors =validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }
        const updateUser = req.body;
        await User.findById(req.params.id)
        .then(user =>{

            user.firstName = updateUser.firstName ? updateUser.firstName : user.firstName;
            user.lastName = updateUser.lastName ? updateUser.lastName : user.lastName;
            user.email = updateUser.email ? updateUser.email : user.email;
            user.phoneNumber = updateUser.phoneNumber ? updateUser.phoneNumber : user.phoneNumber;
            user.password = updateUser.password ? updateUser.password : user.password;

            user.status = updateUser.status ? updateUser.status : user.status;
            if (req.currentUser.role===0)
                user.role = updateUser.role ? updateUser.role : user.role;
            user.save()
                .then(()=> res.json('User account updated!'))
                .catch(err => res.status(400).json({errors:[{msg:err}] }) );
        });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors:[{ msg :'Server Error'} ] } );
    }
});

router.post('/update-upload-photo/:id'
,auth, async (req, res) => {
    try {
        // we use it for user photo and inventory item photo so this check must be comment
        // if (req.params.id !== String(req.currentUser._id) && req.currentUser.role===1 ) {
        //     res.status(400).json({errors: 
        //         [{msg: "Please Request Administrator to update the account"}]})
        //     return;                
        // }
        const file = req.files.file;
        if (file){
            const filename = file.name;
            file.mv(`${picURI}${req.params.id}`, (err) => {
              if (err) {
                const i=0;
            
                res.status(500).json({ errors:[{ msg :'Server upload faild'} ] } );
              } else{
                res.json('User account updated!');
              }
            });
        }
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors:[{ msg :'Server Error'} ] } );
    }
});

// Delete User account, Accepted 
// To delete Account 
// "DELETE: http://localhost:5000/api/users/id"
router.delete('/:id', auth,async (req, res) => {
    try {
        if (req.currentUser.role===1 ) {
            res.status(400).json({errors: 
                [{msg: "Please Request Administrator to delete the account"}]})
            return;                
        }
        if (fs.existsSync(picURI + req.params.id)) 
           fs.unlinkSync(picURI + req.params.id);

        const inventory= await Inventory.find({ userId: req.params.id}) 
            .then((inventorys)=>inventorys.forEach(inventory => {
                if (fs.existsSync(picURI + inventory._id)) 
                fs.unlinkSync(picURI + inventory._id);
                Inventory.findByIdAndDelete(inventory._id);
            }))
        const user = await User.findByIdAndDelete(req.params.id)
            .then(()=> res.json('User account Deleted!'))
            .catch(err => res.status(400).json({ errors: [{ msg:  err}] }));
        
    } catch (error) {
        console.error(err.message);
        res.status(500).json({ errors:[{ msg :'Server Error'} ] } );
    }
});




module.exports = router;
