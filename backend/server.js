const express = require('express');
const fileupload = require("express-fileupload");
const connectDB = require('./config/db');
var cors = require('cors')

const app = express();
app.use(fileupload());
app.use(express.static("files"));
app.use(cors());
/*app.use(function(req, res, next) {
    console.log('Ready to Allow-Origin!');
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });*/
app.use(express.static('public'));

//Connect Database
connectDB();

// Initialize Middleware
app.use(express.json({ extended: false}));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/files', require('./routes/api/files'));
app.use('/api/categorys', require('./routes/api/categorys'));
app.use('/api/inventories', require('./routes/api/inventories'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

