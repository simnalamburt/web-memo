$(document).ready(function() {
  // It let the users click textarea easier
  $('.write, .result').on('click', 'textarea', function() {
    $(this).focus();
  });

  $('textarea').autosize();

  // READ
  var update = function() {
    $.ajax({
      type: 'GET',
      url:  '/memos/',
      success: function(data) {
        $('.result')
        .html(data)
        .find('textarea').autosize();
      }
    });
  };
  
  update();

  // CREATE : When the user clicks the write button
  $('.write > textarea').blur(function() {
    var $text = $('.write > textarea')
    var content = $text.val();

    // No empty memo
    if(!content)
      return;

    $text.val('').trigger('autosize.resize');
    $.ajax({
      type: 'POST',
      url:  '/memos/',
      data: { 'content': content },
      success: update,
    });
  });

  // UPDATE : When the user finished updating the memo
  $('.result').on('blur', 'textarea', function() {
    $.ajax({
      type: 'PUT',
      url:  '/memos/' + $(this).parent().attr('id'),
      data: { 'content': $(this).val() },
    });
  });

  // DELETE : When the user clicks the delete memo button
  $('.result').on('click', 'button', function() {
    $.ajax({
      type: 'DELETE',
      url:  '/memos/' + $(this).parent().attr('id'),
      success: update,
    });
  });
});
