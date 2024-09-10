const background = document.getElementById("background");
const passwordLabel = document.getElementById("passwordLabel");
const passwordInput = document.getElementById("password");

passwordInput.addEventListener("input", (e) => {
    const password = e.target.value;
    const length = password.length;

    // Özel karakter kontrolü: !, @, #, $, %, ^, &, *, vs.
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (length >= 10 && specialCharRegex.test(password)) {
        passwordLabel.style.color = "green";
        passwordLabel.innerText = "Strong Password";
        background.style.filter = "blur(0px)";
    } else if (length >= 10) {
        passwordLabel.style.color = "orange";
        passwordLabel.innerText = "Password should include special characters!";
        background.style.filter = "blur(10px)";
    } else {
        passwordLabel.style.color = "red";
        passwordLabel.innerText = "Weak Password";
        background.style.filter = "blur(20px)";
        
    }

    // Arka plan bulanıklığı ayarı
    
  
});
