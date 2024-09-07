const jokeEl= document.getElementById("jokes");
const jokeBtn= document.getElementById("jokeBtn");

generetaJoke();

//async API 

async function generetaJoke() {
const config = {headers: {Accept: "application/json",},}

    const res = await fetch("https://icanhazdadjoke.com" ,config);

    const data = await res.json();

    jokeEl.innerHTML= data.joke;
}

//FETCH API

// function generetaJoke() {
// const config = {
//     headers: {
//         Accept: "application/json",
//     },

//     }

//     fetch("https://icanhazdadjoke.com" ,config)

//      .then((res) => res.json())
//         .then((data) => {
//         jokeEl.innerHTML = data.joke;

//         })

// }

jokeBtn.addEventListener("click", generetaJoke);
