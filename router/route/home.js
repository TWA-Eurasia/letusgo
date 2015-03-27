var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var connect = require('../../model/goodsSchema.js');
var

router.get('/', function (req, res) {
  res.render('index');



});


module.exports = router;
