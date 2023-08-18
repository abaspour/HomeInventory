const express = require('express');
const router = express.Router();
var fs = require('fs');
const config = require('config');
const picURI = config.get('picURI');


//  @route  GET api/posts
//  @desc   Test route
//  @access Public
router.get('/:id', (req, res) => {
    let file=  req.params.id;
    if (!fs.existsSync(picURI + file)) 
      file="default.png";
    fs.readFile(picURI + file, function (err,data) {
      if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
      }
      res.writeHead(200);
      res.end(data);
    })
  })
  router.get('/', (req, res) => {
    const  file="default.png";
    fs.readFile(picURI + file, function (err,data) {
      if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
      }
      res.writeHead(200);
      res.end(data);
    })
  })

module.exports = router;