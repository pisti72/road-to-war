var canvas = document.getElementById("editor")
var ctx = canvas.getContext("2d")
canvas.width = 800
canvas.height = 480

document.getElementById('fileInput').addEventListener('change', function(event) {
   const file = event.target.files[0];
   const info = `File Name: ${file.name} <br> File Size: ${file.size} bytes<br> File Type: ${file.type}`;
   document.getElementById('fileInfo').innerHTML = info;
   file.readAsText()
});