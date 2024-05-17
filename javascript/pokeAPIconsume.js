import { observer } from "./intersectionOb.js";
import modalInformation from "./modalInformation.js";
const pokeURL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const contenedorPokemon = document.querySelector('.contenedor')
let fragmentoContenedorPokemon = document.createDocumentFragment();
let totalRequestedPokemon = 0;
const loadingPokemonCounter = document.querySelector(".logo a") 
let pokemonNumberIncrementer = 0;


function main() {



    ajaxRequest(pokeURL, data => getEachPokemon(data))


}

function getEachPokemon(data) {

    totalRequestedPokemon = data.results.length;
    const promises = [];

    // totalRequestedPokemon = 20;


    for (let i = 0; i < totalRequestedPokemon; i++) {
        const eachPokemonURL = data.results[i].url;

        const promise = new Promise((resolve, reject) => {
            ajaxRequest(eachPokemonURL, pokemon => { resolve(pokemon) })


        })

        promises.push(promise)

    }

    Promise.all(promises)
        .then(pokemons => {
            pokemons.forEach((pokemon)=>
            {
                printPokemon(pokemon)
            })
        })
        .catch((error) => {
            console.log(error)
        })
}


function printPokemon(pokemon) {
   
    const article = document.createElement('article')
    const imagen = document.createElement('img')
    const titulo = document.createElement('h2')
    const parrafo = document.createElement('p')
    const pillContainer = document.createElement('div')
    const pokeButton = document.createElement('button')
    
    const pokemonTypes = getType(pokemon) 

    
    pokemonTypes.forEach(type =>{
        const typePill = document.createElement('div')
        typePill.classList.add('pill')
        typePill.classList.add(type)
        typePill.textContent = type.toUpperCase()
        pillContainer.appendChild(typePill)
    })

    
    pokeButton.classList.add('pokeButton')
    article.classList.add('card')


    imagen.setAttribute('data-src', pokemon.sprites.front_default)
    titulo.textContent = pokemon.name
    parrafo.textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt adipisci voluptates minus excepturi laboriosam dolores reprehenderit iste magnam quis, vero dolor perspiciatis! Ex facilis quibusdam suscipit, maxime repellat tenetur velit?'
    pokeButton.textContent = "MAS INFORMACION "

    article.appendChild(imagen)
    article.appendChild(titulo)
    article.appendChild(pillContainer)
    article.appendChild(pokeButton)
    // article.appendChild(parrafo)

    //añadir fragmento recolectado al documento
    fragmentoContenedorPokemon.appendChild(article)

    pokemonNumberIncrementer = fragmentoContenedorPokemon.children.length

    console.log(pokemonNumberIncrementer)

    if (fragmentoContenedorPokemon.children.length == totalRequestedPokemon){
        contenedorPokemon.appendChild(fragmentoContenedorPokemon)
        observer()
  
        modalInformation()
        
    }
    



}

function getType(pokemon){
    const pokemonTypes = [];
    pokemon.types.forEach(abilityIndex =>
    {
        pokemonTypes.push(abilityIndex.type.name)

        // if (habilidades.length == pokemon.abilities.length){
        //     console.log(`Pokemon:${pokemon.name} arrayHabilidadeslength:${habilidades.length} pokemonHabilidadesDefault:${pokemon.abilities.length }`)
        //     console.log("Listo my broda")
        // }
    }
    )
    return pokemonTypes
}


function ajaxRequest(url, callback) {


    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.log("petición fallida"));




}



addEventListener('DOMContentLoaded', main);