const mongoose = require('mongoose');


const inventorySchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true
    } ,  
    categoryId: {
        type: String, 
        required: true
    } ,  
    name: {
        type: String, 
        required: true
    } ,  
    price: {
        type: String, 
        required: true
    } ,  
});

const Inventory = mongoose.model('inventory', inventorySchema);

module.exports = Inventory;