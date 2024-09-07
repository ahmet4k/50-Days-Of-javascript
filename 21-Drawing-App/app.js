const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeRange = document.getElementById("size");
const colorPicker = document.getElementById("color");
const clearBtn = document.getElementById("clear");
const eraserBtn = document.getElementById("eraser");

let size = 8;
let color = "black";
let isPressed = false;
let isEraser = false; // Silgi modunu takip eden bir bayrak
let x;
let y;

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = isEraser ? "white" : color; // Eğer silgi modu aktifse beyaz renkle çiz
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = size * 2;
  ctx.strokeStyle = isEraser ? "white" : color; // Eğer silgi modu aktifse beyaz renkle çiz
  ctx.stroke();
}

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

increaseBtn.addEventListener("click", () => {
  size += 1;
  if (size > 64) {
    size = 64;
  }
  updateSize();
});

decreaseBtn.addEventListener("click", () => {
  size -= 1;
  if (size < 4) {
    size = 4;
  }
  updateSize();
});

function updateSize() {
  sizeRange.innerText = size;
}

colorPicker.addEventListener("change", (e) => {
  color = e.target.value;
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

eraserBtn.addEventListener("click", () => {
  isEraser = !isEraser; // Silgi modunu açıp kapatmak için geçiş yap
 
});
