document.addEventListener('DOMContentLoaded', () => {
    const carImage = document.getElementById('carImage');
    const colorButtons = document.querySelectorAll('.color-button');

    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const color = button.getAttribute('data-color');
            // Try PNG format first, then fallback to JPEG if PNG not found
            carImage.src = `image/${color}.png`;
            carImage.onerror = () => {
                carImage.src = `image/${color}.jpeg`;
            };
        });
    });
});
