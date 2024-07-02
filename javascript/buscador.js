const buscador = document.querySelector('#buscador')

buscador.addEventListener("keyup",()=>{
    let cards = document.querySelectorAll('.card');
    let filter = buscador.value.toUpperCase();
    
    cards.forEach(card => {
        let title = card.querySelector('h2').textContent.toUpperCase();
        if(title.indexOf(filter) > -1){
            card.style.display = '';
        }else{
            card.style.display = 'none';
        }
    })
})