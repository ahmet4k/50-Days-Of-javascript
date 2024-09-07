const poke_container = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");

const pokemon_count = 1025;

const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
  dark:"#8B6D5B",
  ghost:"#7D7CC0",
};

searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const poke_name = document.querySelectorAll(".poke-name");
  poke_name.forEach((pokemonName) => {
   if(pokemonName.innerHTML.toLowerCase().includes(value)){
    pokemonName.parentElement.parentElement.style.display = "block";
   }
   else{
    pokemonName.parentElement.parentElement.style.display = "none";
   }
  })
})

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Pokémon ID: ${id} alınamadı`);
    }
    const data = await res.json();
    createPoke(data);
  } catch (error) {
    console.error(error);  // Hataları logla
  }
};

const createPoke = (pokemon) => {
  const poke_div = document.createElement("div");
  poke_div.classList.add("pokemon");
  const pokemonId = pokemon.id.toString().padStart(4, "0");
  const pokemonExp = pokemon.base_experience.toString();
  const pokeWeight = pokemon.weight.toString();
  const pokemonTtpe = pokemon.types[0].type.name;
  const pokemonTtpe2=pokemon.types[1] ? pokemon.types[1].type.name : "";
  const pokemonBg = bg_color[pokemonTtpe];
  poke_div.style.backgroundColor = `${pokemonBg}`;

  const pokemonDivInnerHtml = `
    <div class="image-container">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="Pokemon 1 image" />
           </div>
           <div class="poke-info">
              <span class="poke-id">${pokemonId}</span>
              <h3 class="poke-name">${pokemon.name}</h3>
              <div class="small">
                 <small class="poke-exp">
                    <i class="fa-solid fa-flask"></i> <span>${pokemonExp} exp</span>
                 </small>
                 <small class="poke-weight">
                    <i class="fa-solid fa-weight-scale"></i> <span>${pokeWeight} kg</span>
                 </small>
              </div>
              <div class="poke-type">
                 <i class="fa-brands fa-uncharted"></i> <span> ${pokemonTtpe} ${pokemonTtpe2}</span>
              </div>
           </div>`;

  poke_div.innerHTML = pokemonDivInnerHtml;

  poke_container.appendChild(poke_div);
};
fetchPokemons();
