$('.search-box input').keyup(function() {
  if($(this).val().length != 0) {
    $(this).parents().find('.search-box-container').removeClass('display')
    $(this).parent().addClass('search-box-open');
  } else {
    $(this).parents().find('.search-box-container').addClass('display');
    $(this).parent().removeClass('search-box-open');
  }
});

$('.search-box .search-box-list li').click(function() {
  var value = $(this).html(),
      element = '<li><span class="search-box-text">' + value + '</span><i class="fa fa-times search-box-del" aria-hidden="true"></i></li>';
  $('.search-box-list-curr').append(element);
  $('.search-box-del').click(function() {
    $(this).parent().remove();
  })
})

$(document).on('click', function (e) {
  var target = $(e.target).closest(".search-box"),
      targetTwo = $(e.target).closest(".search-box-del");
  if (!target.length && !targetTwo.length) {
      $(".search-box-container").addClass("display");
      $('.search-box-open').removeClass('search-box-open');
  }
});