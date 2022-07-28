//To generate QR Codes
const form = document.querySelector('#choices');
const dropdown = document.querySelector('#options');
const linkForm = document.querySelector('.input-div .link-form');
const inputField = document.querySelector('.input-div .link-form .input');
const linkButton = document.querySelector('.link-submit');
const qrCodeDisp = document.querySelector('#qrcodedisp');

linkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    CreateQR(inputField.value);
});


function CreateQR(link) {
    qrCodeDisp.innerHTML = "";
    let qrcode = new QRCode(qrCodeDisp, {
        text : link,
        width : 128,
        height : 128, 
        colorDark : '#000000',
        colorLight : '#ffffff',
        correctLevel : QRCode.CorrectLevel.H
    });
}

//to scan qr codes(shit ton of work needed)
(function() {
    let canvas = document.getElementById("canvasElement");
    let context = canvas.getContext('2d');
    let video = document.getElementById("videoElement");
    let vendorURL = window.URL || window.webkitURL;

    navigator.mediaDevices.getUserMedia({
        video: true, 
        audio: false
    })
    .then((stream) => {
        video.srcObject = stream;
        video.setAttribute("playsinline", true); 
        video.play();
        requestAnimationFrame(tick);
    })
    .catch(err => console.log(err))

    video.addEventListener('play', function () {
        draw(this, context, 400, 300);
    }, false);

    function draw(vid, cont, width, height) {
        cont.drawImage(vid, 0, 0, width, height);
        setTimeout(draw, 10, vid, cont, width, height);
    }

    function tick() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            let imageData = context.getImageData(0, 0, canvasElement.width, canvasElement.height);
            let code = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: "dontInvert",
            });
            if (code) {
                drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
                drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
                drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
                drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
                console.log(code.data);
                video.src = "";//almost there
                canvas.hidden = true;
            } else {
                console.log("Not Working!!!!");
            }
        }
        requestAnimationFrame(tick);
    }

    function drawLine(begin, end, color) {
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.lineWidth = 4;
        context.strokeStyle = color;
        context.stroke();
    }
})();
