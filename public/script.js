$(document).ready(function() {
  // It let users click textarea easier
  $('.write, .result').on('click', '.memo', function() {
    $('textarea', this).focus();
  });

  $('.memo > textarea').autosize();

  var update = function() {
    $.get('/articles/', function(data) {
      $('.result').html(data);
      $('.memo > textarea').autosize();
    });
  };
  
  update();

  $('.write a').click(function() {
    var $text = $('.write textarea')
    var content = $text.val();
    $text.val('').trigger('autosize.resize');
    $.post('/articles/', content, update);
  });
});
