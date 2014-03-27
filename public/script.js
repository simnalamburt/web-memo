$(document).ready(function() {
  $('textarea').autosize();
  
  $('.memo-new').click(function() {
    $('.memo-new > textarea').focus();
  });

  $('.memo-write').click(function() {
    var content = $('.memo.memo-new > textarea').val();
    alert(content);
  });
});
