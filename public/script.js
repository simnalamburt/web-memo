$(document).ready(function() {
  $('textarea').autosize();
  
  $('.memo-new').click(function() {
    $('.memo-new > textarea').focus();
  });

  $('.memo-write').click(function() {
    var $text = $('.memo.memo-new > textarea')
    var content = $text.val();
    if (content) {
      $text.val('').trigger('autosize.resize');
      $.ajax({
        type: "POST",
        url: "/",
        data: content,
      });
    }
  });
});
