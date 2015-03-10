var express = require('express');
var router = express.Router();

var Cart = require('../../model/cartSchema.js');

router.get('/', function (req, res) {

  Cart.find(function (err, cart) {

    if (err) return next(err);
    res.send(cart);
  });
});

router.post('/', function (req, res) {
  var id = req.body.id;
  Cart.create({itemId: id, number: 1});
});

module.exports = router;

