'use strict';
var mongoose = require('mongoose');
var Item = require('./ItemSchema');

var cartSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
  number: Number
});

module.exports = mongoose.model('cart', cartSchema);
