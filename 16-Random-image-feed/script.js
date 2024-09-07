// script.js
function addRandomImage() {
    const imageUrl = `https://picsum.photos/seed/${Math.random()}/300/300`;
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Random Image";
    document.querySelector(".container").appendChild(img);
}

window.onload = function() {
    const totalImages = 3 * 3; // 3x3 grid

    for (let i = 0; i < totalImages; i++) {
        addRandomImage();
    }
};
