const URL = "https://pokeapi.co/api/v2/type";

fetch(URL)
    .then(response => response.json())
    .then(data => main(data))

function main(data)
{
    const container = document.querySelector(".container")
    
    const tipos = data.results
    
    tipos.forEach(tipo =>{
        const div = document.createElement('div')
        const nombreTipo= tipo.name.toUpperCase()
        div.classList.add('pill')
        div.classList.add(tipo.name)
        div.textContent = nombreTipo;
        container.appendChild(div)

    })
}