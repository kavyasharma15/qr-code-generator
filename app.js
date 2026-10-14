const qrInput = document.getElementById("qr-input");
const errorMessage = document.getElementById("error-message");
const generateBtn = document.getElementById("generate-btn");
const resetBtn = document.getElementById("reset-btn");
const qrContainer = document.getElementById("qrcode-container");
const qrResultSection = document.getElementById("qr-result-section");
const downloadBtn = document.getElementById("download-btn");

let qrCodeObj = null;

function generateQRCode() {
  const text = qrInput.value.trim();

  if (text === "") {
    showError("Please enter some text or a valid URL!");
    return;
  }

  hideError();
  qrContainer.innerHTML = "";

  qrCodeObj = new QRCode(qrContainer, {
    text: text,
    width: 180,
    height: 180,
    colorDark: "#2d3748",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  qrResultSection.classList.add("show");
}

function downloadQRCode() {
  const qrImage = qrContainer.querySelector("img");
  const qrCanvas = qrContainer.querySelector("canvas");

  let imageSource = "";

  if (qrImage && qrImage.src) {
    imageSource = qrImage.src;
  } else if (qrCanvas) {
    imageSource = qrCanvas.toDataURL("image/png");
  } else {
    alert("Please generate a QR code first!");
    return;
  }

  const downloadLink = document.createElement("a");
  downloadLink.href = imageSource;
  downloadLink.download = "my-qrcode.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function resetQRCode() {
  qrInput.value = "";
  hideError();
  qrContainer.innerHTML = "";
  qrCodeObj = null;
  qrResultSection.classList.remove("show");
  qrInput.focus();
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add("show");
  qrInput.classList.add("shake");

  setTimeout(() => {
    qrInput.classList.remove("shake");
  }, 300);

  qrInput.focus();
}

function hideError() {
  errorMessage.textContent = "";
  errorMessage.classList.remove("show");
  qrInput.classList.remove("shake");
}

generateBtn.addEventListener("click", generateQRCode);
resetBtn.addEventListener("click", resetQRCode);
downloadBtn.addEventListener("click", downloadQRCode);

qrInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    generateQRCode();
  }
});

qrInput.addEventListener("input", () => {
  if (qrInput.value.trim() !== "") {
    hideError();
  }
});
