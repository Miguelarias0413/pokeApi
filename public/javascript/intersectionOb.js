export function observer(){
    const pokemonCards = document.querySelectorAll('.card')
    
    const options = {
        root: null,
        rootMargin: '0px 0px',
        threshold: 0.1
    }

    const observador = new IntersectionObserver((entries,observer)=>{
        entries.forEach(entry=>{
            if (entry.isIntersecting){
                if (entry.target.firstElementChild.hasAttribute('src')){
                    return
                }
                // console.log('se esta viendo el elemento')
                entry.target.firstElementChild.setAttribute('src', entry.target.firstElementChild.dataset.src)
                observer.unobserve(entry.target)
                entry.target.classList.add('fade-in')

            }
        })
    }, options)

   pokemonCards.forEach(card=>{
       observador.observe(card)
   })
}


