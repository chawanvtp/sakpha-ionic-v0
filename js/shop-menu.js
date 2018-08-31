$(".menu__submit").click(function(e) {
    var menu_val = $(this).val();
    alert(menu_val);

    location.href = menu_val;
  
});