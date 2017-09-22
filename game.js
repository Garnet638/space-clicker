function tab(tabName){
  $('.gameTab').slideUp(0);
  $('.gameTabSelector').removeClass('selectedTab');
  $('#tab'+tabName).addClass('selectedTab');
  $('#'+tabName).slideDown(0);
}
