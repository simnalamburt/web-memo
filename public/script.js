$(document).ready(function() {
  $('.memo').click(function() {
    $('textarea', this).autosize().focus();
  });

  $.get('/articles/', function(data) {
    $('.result').html(data);
  });

  $('.memo-write').click(function() {
    var $text = $('.memo.memo-new > textarea')
    var content = $text.val();
    if (content) {
      $text.val('').trigger('autosize.resize');
      $.post('/articles/', content, function() {
        $.get('/articles/', function(data) {
          $('.result').html(data);
        });
      });
    }
  });
});
