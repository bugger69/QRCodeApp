import qrcode from "qrcodejs"

const form = document.querySelector('#choices');
const dropdown = document.querySelector('#options');
const linkForm = document.querySelector('.input-div .link-form');
const inputField = document.querySelector('.input-div .link-form .input');
const linkButton = document.querySelector('.link-submit');
const qrCodeDisp = document.querySelector('#qrcodedisp');
let nLinkboxes = 0;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(dropdown.value === "generate" && nLinkboxes === 0) {
        addLinkbox();
        nLinkboxes++;
    } else {
        //
    }
});

function addLinkbox() {
    const input = document.createElement('input');
    const label = document.createElement('label');
    label.textContent = 'Enter the Link: ';
    input.id = "link-in";
    label.htmlFor = "link-in";
    inputField.append(label);
    inputField.append(input);
    updateButton(linkButton, input);
}

function updateButton(Button, inp) {
    Button.textContent = "Convert";
    Button.addEventListener('click', (e) => {
        e.preventDefault();
        let link = inp.value;
        CreateQR(link);
    });
    Button.addEventListener('keydown', (e) => {
        e.preventDefault();
        if(e.keyCode == 13) {
            let link = inp.value;
            CreateQR(link);
        }
    })
}

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