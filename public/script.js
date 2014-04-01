$(document).ready(function() {
  $('textarea').autosize();
  
  $('.memo-new').click(function() {
    $('.memo-new > textarea').focus();
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
