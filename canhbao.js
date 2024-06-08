// Gửi giá trị chuỗi lên Firebase
function sendValueToFirebase(path, value) {
    var updates = {};
    updates[path] = value; // Giữ giá trị là chuỗi
    firebase.database().ref("/IOT/CB").update(updates, function(error) {
        if (error) {
            console.log('Không thể gửi dữ liệu lên Firebase:', error);
        } else {
            console.log('Dữ liệu đã được gửi lên Firebase thành công.');
        }
    });
}

// Function để cập nhật giá trị hiển thị
function updateDisplayedValue(sliderId, value) {
    document.getElementById(sliderId + 'Value').innerText = value;
}

// Thêm event listener cho các slider
document.getElementById('ND').addEventListener('input', function() {
    var value = this.value;
    sendValueToFirebase('ND', value);
    updateDisplayedValue('ND', value);
});

document.getElementById('DA').addEventListener('input', function() {
    var value = this.value;
    sendValueToFirebase('DA', value);
    updateDisplayedValue('DA', value);
});

document.getElementById('KG').addEventListener('input', function() {
    var value = this.value;
    sendValueToFirebase('KG', value);
    updateDisplayedValue('KG', value);
});

// Lấy giá trị Nhiệt độ cảnh báo từ Firebase
firebase
  .database()
  .ref("/IOT/CB/ND")
  .on("value", function (snapshot) {
    var temptcb = snapshot.val();
    document.getElementById("nhietdocb").innerHTML = temptcb;
  });

// Lấy giá trị Độ ẩm cảnh báo từ Firebase
firebase.database().ref("/IOT/CB/DA").on("value", function(snapshot) {
    var doAmcb = snapshot.val();
    document.getElementById("doamcb").innerHTML = doAmcb;
});

// Lấy giá trị khí gas cảnh báo từ Firebase
firebase.database().ref("/IOT/CB/KG").on("value", function(snapshot) {
    var gcb = snapshot.val();
    document.getElementById("gascb").innerHTML = gcb;
});
