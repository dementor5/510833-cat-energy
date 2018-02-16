var btnSelector = "main-nav__toggle";
var menuSelector ="main-nav";
var menuShowSelector = "main-nav--show";
var tabPressSelector = "tabulated";

var btn = document.querySelector("." + btnSelector);
var menu = document.querySelector("." + menuSelector);

document.documentElement.classList.remove("no-js");

function openMenu () {
  menu.classList.add(menuShowSelector);
}

function closeMenu() {
  menu.classList.remove(menuShowSelector);
}

btn.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (menu.classList.contains(menuShowSelector)) {
    closeMenu()
  } else {
    openMenu();
  }
});

window.addEventListener("keydown", function (evt) {
  if ((evt.keyCode === 9) || (evt.keyCode >= 37 && evt.keyCode <= 40)) {
    document.documentElement.classList.add(tabPressSelector);
  }

  if (evt.keyCode === 27) {
    if (menu.classList.contains(menuShowSelector)) {
      closeMenu();
    }
  }
});

window.addEventListener("mousedown", function (evt) {
  document.documentElement.classList.remove(tabPressSelector);
});

document.querySelector("body").addEventListener("click", function(evt) {
  if(menu.classList.contains(menuShowSelector) && !menu.contains(evt.target)) {
    closeMenu();
  }
});

function initMap() {
  var office = {
    lat: 59.938667,
    lng: 30.323185
  };
  var map = new google.maps.Map(document.querySelector(".contacts__map-interactive"), {
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
