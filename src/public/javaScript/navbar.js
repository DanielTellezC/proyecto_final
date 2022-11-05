const visible = document.getElementsByClassName('navbar_menu')[0];
const menu = document.getElementsByClassName('navbar_link');
visible.addEventListener('click', function(){
    for(var i = 0; i < menu.length; i++){
        menu[i].classList.toggle('active');
    }
});