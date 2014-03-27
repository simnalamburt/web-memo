$(document).ready(function() {
  $('textarea').autosize();
  
  $('.memo-new').click(function() {
    $('.memo-new > textarea').focus();
  });
});
