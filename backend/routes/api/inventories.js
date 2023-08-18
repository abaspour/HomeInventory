const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Inventory = require('../../models/inventory');
var fs = require('fs')
const config = require('config');
const picURI = config.get('picURI');


//  @route  GET api/profile/me
//  @desc   Get current users profile
//  @access Private
router.get('/', auth, async (req, res, next) => {
    Inventory.find({userId: req.currentUser._id}).then(function(inventorys){
        res.send( inventorys);
    }).catch(next);
});
 
//get a list of inventorys from the db
router.get('/:id', auth, async(req, res, next) => {
    Inventory.findOne({_id: req.params.id, userId: req.currentUser._id}).then(function(inventory){
        res.send( inventory);
    }).catch(next);
});
 
//add a new inventory to db
router.post('/', auth, async(req, res, next) => {
    if (req.body.userId != req.currentUser._id)
       return res.status(400).json({errors: [{msg: 'UserId isnot your userId'}]});
    Inventory.create(req.body).then(function(inventory){
        res.send(inventory);
    }).catch(next);
});

//update a inventory in the DB
router.put('/:id', auth, function(req, res, next){
    if (req.body.userId != req.currentUser._id)
       return res.status(400).json({errors: [{msg: 'UserId isnot your userId'}]});
    Inventory.findOneAndUpdate({_id: req.params.id, userId: req.currentUser._id}, req.body).then(function(inventory){
        Inventory.findOne({_id: req.params.id}).then(function(inventory){
        res.send(inventory);
        });
    });
}); 

// delete an item from the db
//
router.delete('/:id',auth, function(req, res, next){
    Inventory.findOneAndDelete({_id: req.params.id, userId: req.currentUser._id})
    .then(function(inventory){
        if (fs.existsSync(picURI + inventory._id)) 
           fs.unlinkSync(picURI + inventory._id);
            res.send(inventory);
    }); 
});

module.exports = router;