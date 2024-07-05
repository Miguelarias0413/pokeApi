function modalInformation() {
  const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
  const pokeButtons = document.querySelectorAll(".pokeButton");
  const modalCloseButton = document.getElementById("modalCloseButton");
  const modalPokemon = document.querySelector(".modalPokemon");
  const modalContainerPokemon = document.querySelector(".modalContainer");

  modalCloseButton.addEventListener("click", () => {
    modalPokemon.classList.toggle("hidden");
    modalContainerPokemon.classList.toggle("fade-in");
  });

  pokeButtons.forEach((pokeButton) => {
    pokeButton.addEventListener("click", () => {
      let pokeCardParent = pokeButton.parentElement;
      let titlePokeCard = pokeCardParent.querySelector("h2").textContent;

      console.log(titlePokeCard);
      console.log(pokemonURL + titlePokeCard);
      fetch(pokemonURL + titlePokeCard)
        .then(
            response => response.json()
        )
        .then(
            data => modalController(data)
        )
        .catch((error) => {
          if (titlePokeCard == "El chiky") {
            Swal.fire({
              icon: "success",
              title: "Acabas de encontrar al chiky",
              text: "Este es mi gran perrito pero lamentablemente no es un pokemon con caracteristicas pokemon",
            });
          }
          else
          {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo cargar la informacion del pokemon por problemas de un tercero",
            });
          }
        });
    });
  });
}

function modalController(pokemon) {
  //Acciones en cuanto obtener y estilizar modal
  const modalPokemon = document.querySelector(".modalPokemon");
  const modalContainerPokemon = document.querySelector(".modalContainer");
  modalContainerPokemon.classList.toggle("fade-in");
  modalPokemon.classList.toggle("hidden");

  //Obtener propiedades del pokemon
  const pokemonID = pokemon.id;
  const pokemonName = pokemon.name;
  const pokemonHeigth = pokemon.height;
  const pokemonWeight = pokemon.weight;
  const pokemonAbilities = pokemon.abilities;
  const pokemonStats = pokemon.stats;
  const pokemonTypes = getType(pokemon);
  const pokemonSprites = getSprite(pokemon);
  console.log({ pokemonName, pokemonHeigth, pokemonWeight, pokemonAbilities, pokemonTypes, pokemonStats, pokemonSprites })

  //obtener elementos del modal
  const modalSpritesPokemonContainer = modalContainerPokemon.querySelector(".modal__imgs")
  const modalTitlePokemon = modalContainerPokemon.querySelector("h2");
  const modalIDPokemon = modalContainerPokemon.querySelector("#modal__idValue");
  const modalHeightPokemon = modalContainerPokemon.querySelector("#modal__heightValue");
  const modalWeightPokemon = modalContainerPokemon.querySelector("#modal__weightValue");
  const modalAbilitiesPokemonContainer = modalContainerPokemon.querySelector('.modal__info--container--abililities');
  const modalAbilitiesPokemon = modalAbilitiesPokemonContainer.querySelectorAll(".modal__abilitiesValue");
  const modalAllStatsPokemonValues= document.querySelectorAll('.modal__info--container-item--stat-value')
  const modalTypesContainer = document.querySelector('.modal__info--types')
  //Estilizar y establece propuiedaades al modal -----------------------
  modalTitlePokemon.textContent = pokemonName;
  modalIDPokemon.textContent = pokemonID;
  modalHeightPokemon.textContent = pokemonHeigth;
  modalWeightPokemon.textContent = pokemonWeight;
  
  //eliminando primero habilidades y luego poniendo las seleccionadas
  modalAbilitiesPokemon.forEach(abilitie=>{
    abilitie.remove()
  })
  pokemonAbilities.forEach(ability=>{
    const newPokemonAbility = document.createElement('p')
    newPokemonAbility.className = "modal__info--container--item--value"
    newPokemonAbility.classList.add('modal__abilitiesValue')
    newPokemonAbility.innerText = ability.ability.name
    modalAbilitiesPokemonContainer.append(newPokemonAbility)
  })

  // elmininando primero imagenes y ponendolas
  modalSpritesPokemonContainer.innerHTML = ''
  pokemonSprites.forEach(spriteURL=>{
    const imgSprite = document.createElement('img')
    imgSprite.src = spriteURL;
    modalSpritesPokemonContainer.append(imgSprite)
  })
  //establecer habilidad segun el indice 
  modalAllStatsPokemonValues.forEach((statValue,index)=>{

    statValue.textContent = pokemonStats[index].base_stat;
    
  })

  modalTypesContainer.innerHTML =''
  pokemonTypes.forEach(type=>{
    const pill = document.createElement('div')
    pill.className = 'pill'
    pill.classList.add(type)
    pill.textContent = type;
    modalTypesContainer.append(pill)
  })


}

function getType(pokemon) {
  const pokemonTypes = [];
  pokemon.types.forEach((abilityIndex) => {
    pokemonTypes.push(abilityIndex.type.name);
  });
  return pokemonTypes;
}
function getSprite(pokemon) {
  const defaultSprites = [];
  const sprites = pokemon.sprites;
  for (const propiedad in sprites) {
    if (propiedad.includes("default")) {
      defaultSprites.push(sprites[propiedad]);
    }
  }

  return defaultSprites;
}

export default modalInformation;
