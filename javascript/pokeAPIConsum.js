const containerPokemon = document.querySelector('.contenedor')
const pokeUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
const numPokemons = 1300;
const barradecarga = document.querySelector('#carga--barra')
//peticion de todos los pokemones 
fetch(pokeUrl)
 .then(request => request.json())
 .then(data => getPokemon(data)
)

//obtener un pokemón a la vez
function getPokemon(data){
    
    let pokemonCounter = 0;
    for(const pokemon of data.results){

        pokemonCounter++;
        if (pokemonCounter <= numPokemons){
            fetch(pokemon.url)
            .then(response=> response.json())
            .then(data => 
                printpokemon(data)
        
             )

        }
        

    }

}

let cantidadElementos = 0;
const fragment = document.createDocumentFragment()

function printpokemon(pokemon){
    const article = document.createElement('article')
    article.classList.add('card')
    const imagen = document.createElement('img')
    imagen.setAttribute('data-src', pokemon.sprites.front_default)

    const titulo = document.createElement('h2')
    titulo.textContent = pokemon.name

    const parrafo = document.createElement('p')
    parrafo.textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt adipisci voluptates minus excepturi laboriosam dolores reprehenderit iste magnam quis, vero dolor perspiciatis! Ex facilis quibusdam suscipit, maxime repellat tenetur velit?'
    console.log(pokemon)
    
    article.appendChild(imagen)
    article.appendChild(titulo)
    article.appendChild(parrafo)
    
    // const pokemonCard =  `
    //   <img data-src="${pokemon.sprites.front_default}" alt="">
    //   <h2>${pokemon.name}</h2>
    //   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt adipisci voluptates minus excepturi
    //   laboriosam dolores reprehenderit iste magnam quis, vero dolor perspiciatis! Ex facilis quibusdam suscipit,
    //   maxime repellat tenetur velit?</p>
    
    // `;
    // article.innerHTML = pokemonCard;
    fragment.appendChild(article)
    // console.log(fragment.children.length)

    if (fragment.children.length){
        cantidadElementos++;
        // porcentaje carga
        let porcentaje = (cantidadElementos/numPokemons)*100;
        barradecarga.style.width = `${porcentaje}%`
        const cargaContenedor = document.querySelector('.carga')
        if (porcentaje == 100){
            cargaContenedor.style.display = 'none'
        }
        //agregar una vez que se tengan todos los pokemones en el fragmento

        if (cantidadElementos == numPokemons){
            console.log(cantidadElementos, numPokemons)
            containerPokemon.appendChild(fragment)
            console.log('se agregaron todos los pokemones'	)
        }
    }

    
    
   


    let cards = document.querySelectorAll('.card')
    observer(cards)


}
//Inicio intersection observer

function observer(cards){
    const options = {
        root: null,
        rootMargin: '0px 0px',
        threshold: 0
    }

    const observer = new IntersectionObserver((entries, observer) => {
        let refresh =0;
        entries.forEach(entry =>{
            if(entry.isIntersecting){
               
                entry.target.style.opacity = 1;
                entry.target.firstElementChild.src = entry.target.firstElementChild.dataset.src;
                entry.target.classList.add('fade-in')

            }

        })
    }, options)

    cards.forEach(card => {
        observer.observe(card)
    })

   

}



