
function modalInformation(){
    const pokemonURL = 'https://pokeapi.co/api/v2/pokemon/'
    const pokeButtons = document.querySelectorAll('.pokeButton')
    const modalCloseButton = document.getElementById('modalCloseButton')
    const modalPokemon = document.querySelector('.modalPokemon')
    const modalContainerPokemon = document.querySelector('.modalContainer')
    modalCloseButton.addEventListener('click',()=>{
        console.log("fui clickeado")
        modalPokemon.classList.toggle('hidden')
        modalContainerPokemon.classList.toggle('fade-in')


    })
    pokeButtons.forEach(pokeButton =>{
        pokeButton.addEventListener("click",()=>{
            let pokeCardParent = pokeButton.parentElement;
            let titlePokeCard = pokeCardParent.querySelector('h2').textContent

            console.log(titlePokeCard)
             fetch(pokemonURL + titlePokeCard)
              .then(response => response.json())
              .then(data =>
                modalController(data)
            )
              .catch(error =>{
                if (!titlePokeCard == "El chiky"){
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "No pudimos obtener los datos de este pokemon!",
                      })
                }else{
                    Swal.fire({
                        icon: "success",
                        title: "Acabas de encontrar al chiky",
                        text: "Este es mi gran perrito pero lamentablemente no es un pokemon con caracteristicas pokemon",
                      })
                }
            })
              
            
        })
    })



    
}

function modalController(pokemon){
    const modalPokemon = document.querySelector('.modalPokemon')
    const modalContainerPokemon = document.querySelector('.modalContainer')
    modalContainerPokemon.classList.toggle('fade-in')
    modalPokemon.classList.toggle('hidden')
    


}


export default modalInformation