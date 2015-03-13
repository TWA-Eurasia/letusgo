'use strict';

require.config({
  baseUrl: './',
  paths: {
    'jquery': './jquery/dist/jquery',
    'semantic': './semantic-ui/dist/semantic'
  }
});

require(['jquery', 'semantic'], function ($) {

  $(document).ready(function () {

    $('a#save').on('click', function () {

      initBorder();
      initErrorBox();

      var unit = $('input#itemUnit').val();
      var price = $('input#itemPrice').val();
      var name = $('input#itemName').val();

      if(infoIsVerfied(name, unit, price)){

        saveNewItem(name, unit, price);
      }
    });

    function initBorder() {

      $('#itemName').css('border', "grey 1px solid");
      $('#itemUnit').css('border', "grey 1px solid");
      $('#itemPrice').css('border', "grey 1px solid");
    }

    function initErrorBox() {

      $('#emptyError').hide();
      $('#inputError').hide();
    }

    function infoIsVerfied(name, unit, price) {

      if (!inputsIsIntergrated(name, unit, price)) {

        $('#emptyError').show();
        return false;
      } else {

        if (!inputsIsRight(name, unit, price)) {

          $('#inputError').show();
          return false;
        }

        return true;
      }
    }

    function inputsIsIntergrated(name, unit, price) {

      if (!name) {

        $('#itemName').css('border', "red 1px solid");
      }
      if (!unit) {

        $('#itemUnit').css('border', "red 1px solid");
      }
      if (!price) {

        $('#itemPrice').css('border', "red 1px solid");
      }
      return name && unit && price;
    }

    function inputsIsRight(name, unit, price) {

      if (!inputIsWord(name)) {
        $('#itemName').css('border', "red 1px solid");
      }

      if (!inputIsWord(unit)) {

        $('#itemUnit').css('border', "red 1px solid");
      }

      if (!priceIsNumber(price)) {

        $('#itemPrice').css('border', "red 1px solid");
      }

      return inputIsWord(name) && inputIsWord(unit) && priceIsNumber(price);
    }

    function inputIsWord(word) {

      var trimedWord = word.trim();
      return trimedWord.length > 0;
    }

    function priceIsNumber(price) {

      var reg = /^\d+(\.\d+)?$/;
      return reg.exec(price);
    }

    function saveNewItem(name, unit, price) {

      $.post('/api/item', {name: name.trimLeft(), unit: unit.trimLeft(), price: price.trimLeft()})
        .success(function () {
          $(location).attr('href', '/shopManagement')
        });
    }
  });
});
