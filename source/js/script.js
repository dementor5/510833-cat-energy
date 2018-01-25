var btnOpen = document.querySelector(".main-nav__open");
var btnClose = document.querySelector(".main-nav__close");
var menu = document.querySelector(".main-nav__list");

function openMenu () {
  btnOpen.classList.add("main-nav__open--hide");
  btnClose.classList.add("main-nav__close--show");
  menu.classList.add("main-nav__list--show");
}

function closeMenu() {
  btnOpen.classList.remove("main-nav__open--hide");
  btnClose.classList.remove("main-nav__close--show");
  menu.classList.remove("main-nav__list--show");
}

btnOpen.addEventListener("click", function (evt) {
  evt.preventDefault();
  openMenu();
});

btnClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  closeMenu();
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (menu.classList.contains("main-nav__list--show")) {
      closeMenu();
    }
  }
});

function initMap() {
  var office = {
    lat: 59.938667,
    lng: 30.323185
  };
  var map = new google.maps.Map(document.querySelector(".contacts__map"), {
    center: office,
    zoom: 17
  });
  var marker = new google.maps.Marker({
    position: office,
    title: "Cat Energy",
    map: map,
    icon: {
      url: "img/map-pin.png",
      scaledSize: new google.maps.Size(62, 54)
    }
  });
}

var apiKey = "AIzaSyDQ24knFUBvYr-fSWqjK_WXintVXHlSgDw";
var script = document.createElement("script");
script.src = "https://maps.google.com/maps/api/js?key=" + apiKey + "&callback=initMap";
document.body.appendChild(script);
