import { observer } from "./intersectionOb.js";
const pokeURL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const contenedorPokemon = document.querySelector('.contenedor')
let fragmentoContenedorPokemon = document.createDocumentFragment();
let totalRequestedPokemon = 0;

function main() {



    ajaxRequest(pokeURL, data => getEachPokemon(data))


}

function getEachPokemon(data) {

    totalRequestedPokemon = data.results.length;
    const promises = [];

    totalRequestedPokemon =10;


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

    article.classList.add('card')


    imagen.setAttribute('data-src', pokemon.sprites.front_default)
    titulo.textContent = pokemon.name
    parrafo.textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt adipisci voluptates minus excepturi laboriosam dolores reprehenderit iste magnam quis, vero dolor perspiciatis! Ex facilis quibusdam suscipit, maxime repellat tenetur velit?'
 

    article.appendChild(imagen)
    article.appendChild(titulo)
    article.appendChild(parrafo)

    fragmentoContenedorPokemon.appendChild(article)

    if (fragmentoContenedorPokemon.children.length == totalRequestedPokemon){
        contenedorPokemon.appendChild(fragmentoContenedorPokemon)
        observer()
    }
    



}


function ajaxRequest(url, callback) {


    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.log("petición fallida"));




}



addEventListener('DOMContentLoaded', main);