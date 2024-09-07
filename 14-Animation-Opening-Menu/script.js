const button =document.getElementById("toggle");
const x = document.getElementById("nav");

button.addEventListener("click", function() {
    x.classList.toggle("active");
});