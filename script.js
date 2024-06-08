
// LAY GIA TRI TU FIREBASE VE

firebase
  .database()
  .ref("/IOT/Nhiet do")
  .on("value", function (snapshot) {
    var tempt = snapshot.val();
    document.getElementById("nhietdo1").innerHTML = tempt;
  });

firebase
  .database()
  .ref("/IOT/Do am")
  .on("value", function (snapshot) {
    var humi = snapshot.val();
    document.getElementById("doam1").innerHTML = humi;
  });

  firebase
  .database()
  .ref("/IOT/Gas")
  .on("value", function (snapshot) {
    var gas = snapshot.val();
    document.getElementById("Gas").innerHTML = gas;
  });