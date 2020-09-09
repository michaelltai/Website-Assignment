var n = [];
var p = [];
var s = [];
var q = [];
var i, j;
var total = 0;
var h = 0;
var pi = 0;
var tmp = 0;
var text = "";

//Function for add to cart
function additem(itemname, itemprice, itemsize, itemquantity) {
  if (itemsize === "") {
    alert("Please select a size");
  } else {
    n.push(itemname);
    p.push(itemprice);
    s.push(itemsize);
    q.push(itemquantity);
  }
  sessionStorage.setItem("productname", JSON.stringify(n));
  sessionStorage.setItem("productprice", JSON.stringify(p));
  sessionStorage.setItem("productsize", JSON.stringify(s));
  sessionStorage.setItem("productquan", JSON.stringify(q));
}

function displayproduct() {
  if (typeof Storage !== "undefined") {
    namearr = JSON.parse(sessionStorage.getItem("productname"));
    pricearr = JSON.parse(sessionStorage.getItem("productprice"));
    sizearr = JSON.parse(sessionStorage.getItem("productsize"));
    quanarr = JSON.parse(sessionStorage.getItem("productquan"));

    if (namearr != null) {
      for (j = 0; j < pricearr.length; j++) {
        h = parseInt(pricearr[j]);
        pi = parseInt(quanarr[j]);
        tmp = h * pi;
        total += tmp;
      }
      for (i = 0; i < namearr.length; i++) {
        $("#cartlist").append(
          '<div><h6 class="my-0">' +
            namearr[i] +
            "(" +
            sizearr[i] +
            ")" +
            '</h6><small class="text-muted">Quantity: ' +
            quanarr[i] +
            '</small></div><span class="text-muted">RM ' +
            pricearr[i] +
            "</span>"
        );
      }
    } else {
      $("#cartlist").append(
        '<div><h6 class="my-0">The cart is empty</h6><small class="text-muted">Please add item before checkout </small></div>'
      );
    }
    $("#totallist").append(
      "<span>Total: </span><strong>RM" + total + "</strong>"
    );
  }
}

function btncheckout() {
  var username = $("#username").val();
  var email = $("#email").val();
  var address = $("#address").val();
  var country = $("#country").val();
  var state = $("#state").val();
  var zip = $("#zip").val();

  var expDate = new Date();

  expDate.setMinutes(expDate.getMinutes() + 5);

  document.cookie =
    "username=" + username + "; expires=" + expDate.toUTCString();
  document.cookie = "email=" + email + "; expires=" + expDate.toUTCString();
  document.cookie = "address=" + address + "; expires=" + expDate.toUTCString();
  document.cookie = "country=" + country + "; expires=" + expDate.toUTCString();
  document.cookie = "state=" + state + "; expires=" + expDate.toUTCString();
  document.cookie = "zip=" + zip + "; expires=" + expDate.toUTCString();
  $("#username").val("");
  $("#email").val("");
  $("#address").val("");
  $("#country").val("");
  $("#state").val("");
  $("#zip").val("");
  if (
    username != "" &&
    email != "" &&
    address != "" &&
    country != "" &&
    state != "" &&
    zip != ""
  ) {
    window.location.href = "checkoutdone.html";
  }
}

function displayCheckout() {
  var username = getCookie("username");
  var email = getCookie("email");
  var address = getCookie("address");
  var country = getCookie("country");
  var state = getCookie("state");
  var zip = getCookie("zip");

  $("#thankyou").text("Thank You " + username + " ! ! !");
  $("#showShipInfo").append(
    '<p class="lead">Your Email: ' +
      email +
      '</p><p class="lead">Your address: ' +
      address +
      ", " +
      zip +
      ", " +
      state +
      ", " +
      country +
      "</p>"
  );
}

function initMap() {
  var state = getCookie("state");
  var loc;
  switch (state) {
    case "Johor":
      loc = { lat: 2.030699, lng: 103.317934 };
      break;
    case "Kedah":
      loc = { lat: 6.09647, lng: 100.379488 };
      break;
    case "Kelantan":
      loc = { lat: 5.565226, lng: 102.178648 };
      break;
    case "Malacca":
      loc = { lat: 2.19488, lng: 102.247541 };
      break;
    case "Negeri Sembilan":
      loc = { lat: 2.713493, lng: 101.949274 };
      break;
    case "Pahang":
      loc = { lat: 3.787674, lng: 102.539144 };
      break;
    case "Penang":
      loc = { lat: 5.416301, lng: 100.331937 };
      break;
    case "Perak":
      loc = { lat: 4.591477, lng: 101.09035 };
      break;
    case "Perlis":
      loc = { lat: 6.435624, lng: 100.190146 };
      break;
    case "Sabah":
      loc = { lat: 5.983926, lng: 116.100094 };
      break;
    case "Sarawak":
      loc = { lat: 2.27558, lng: 111.819986 };
      break;
    case "Terengganu":
      loc = { lat: 5.072059, lng: 103.012103 };
      break;
  }
  // The map, centered at the state
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: loc,
  });
  // The marker, positioned at the state
  var marker = new google.maps.Marker({ position: loc, map: map });
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//Function for view product image
function view(name){
  var modal = document.getElementById("myModal");

  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  modal.style.display = "block";
  modalImg.src = document.getElementById(name).src;
  captionText.innerHTML = document.getElementById(name).alt;

  var span = document.getElementsByClassName("close")[0];

  span.onclick = function() {
    modal.style.display = "none";
  }
  
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");

      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

window.onload = displayproduct();
window.onload = displayCheckout();
