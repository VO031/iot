// nhấn nút thay đổi --> gửi firebase

//điều khiển quạt
var btnFan = document.getElementById("fanButton");
var statusFan = 0;

btnFan.onclick = function () {
  statusFan = statusFan + 1;
  statusFan %= 2;
  firebase.database().ref("/IOT/Fan").set(statusFan);

  if (statusFan == 0) {
    document.getElementById("fanImg").src = "./img/fan_off.png";
    document.getElementById("fanStatus").innerHTML = "OFF";
  } else {
    document.getElementById("fanImg").src = "./img/fan_on.png";
    document.getElementById("fanStatus").innerHTML = "ON";
  }
};


//điều khiển đèn
var btnLed = document.getElementById("lightButton");
var statusLed = 0;

btnLed.onclick = function () {
  statusLed = statusLed + 1;
  statusLed %= 2;
  firebase.database().ref("/IOT/Led").set(statusLed);

  if (statusLed == 0) {
    document.getElementById("lightImg").src = "./img/dennguoff.png";
    document.getElementById("lightStatus").innerHTML = "OFF";
  } else {
    document.getElementById("lightImg").src = "./img/dennguon.png";
    document.getElementById("lightStatus").innerHTML = "ON";
  }
};

//   CAP NHAT LAN DAU MOI KHI LOAD LAI TRANG
var statusPage = false;
if (!statusPage) {
  firebase
    .database()
    .ref("/IOT/Led")
    .on("value", function (snapshot) {
      var value_Led = snapshot.val();
      if (value_Led == 0) {
        document.getElementById("lightImg").src = "./img/dennguoff.png";
        document.getElementById("lightStatus").innerHTML = "OFF";
      } else if (value_Led == 1) {
        document.getElementById("lightImg").src = "./img/dennguon.png";
        document.getElementById("lightStatus").innerHTML = "ON";
      }
    });

  firebase
    .database()
    .ref("/IOT/Fan")
    .on("value", function (snapshot) {
      var value_Fan = snapshot.val();
      if (value_Fan == 0) {
        document.getElementById("fanImg").src = "./img/fan_off.png";
        document.getElementById("fanStatus").innerHTML = "OFF";
      } else if (value_Fan == 1) {
        document.getElementById("fanImg").src = "./img/fan_on.png";
        document.getElementById("fanStatus").innerHTML = "ON";
      }
    });

  statusPage = true;
}


