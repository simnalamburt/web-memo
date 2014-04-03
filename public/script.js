$(document).ready(function() {
  // It let the users click textarea easier
  $('.write, .result').on('click', 'textarea', function() {
    $(this).focus();
  });

  $('textarea').autosize();

  var update = function() {
    $.ajax({
      type: 'GET',
      url:  '/articles/',
      success: function(data) {
        $('.result')
        .html(data)
        .find('textarea').autosize();
      }
    });
  };
  
  update();

  // When the user clicks the write button
  $('.write > a').click(function() {
    var $text = $('.write > textarea')
    var content = $text.val();
    $text.val('').trigger('autosize.resize');

    $.ajax({
      type: 'POST',
      url:  '/articles/',
      data: content,
      success: update,
    });
  });

  // When the user finished updating the memo
  $('.result').on('blur', 'textarea', function() {
    $.ajax({
      type: 'PUT',
      url:  '/articles/' + $(this).parent().attr('id'),
      data: $(this).val(),
    });
  });

  // When the user clicks the delete memo button
  $('.result').on('click', 'button', function() {
    $.ajax({
      type: 'DELETE',
      url:  '/articles/' + $(this).parent().attr('id'),
      success: update,
    });
  });
});
