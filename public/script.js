// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-47724944-1', 'hyeon.me');
ga('send', 'pageview');


$(document).ready(function() {
  // It let the users click textarea easier
  $('.write, .result').on('click', 'textarea', function() {
    $(this).focus();
  });

  $('textarea').autosize();

  // READ
  var update = function() {
    $('.result').load('/ .result > *', function() {
      $(this).find('textarea').autosize();
    });
  };

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
