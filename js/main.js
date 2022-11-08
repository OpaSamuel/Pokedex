const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonName = document.querySelector('.pokemon-name')
const pokemonImage = document.querySelector('.pokemon-image')


const form = document.querySelector('.pokemon-form')
const input = document.querySelector('#pokemon-search')

const prevButton = document.querySelector('.prev-btn')
const nextButton = document.querySelector('.next-btn')

let pokemonId = 1


const fechPokemon = async(pokemon) =>{

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(response.status ===200){
        const data = await response.json()
        return data
    }
}

const catchPokemon =async(pokemon)=>{

    pokemonName.innerHTML='Carregando...'
    pokemonNumber.innerHTML=''

    const data = await fechPokemon(pokemon)
    
    if(data){
        pokemonName.innerHTML=data.name
        pokemonNumber.innerHTML=data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemonImage.style.display='block'
        pokemonId=data.id
    }
    else{
        pokemonImage.style.display='none'
        pokemonNumber.innerHTML=''
        pokemonName.innerHTML='Não existe :('
    } 
}

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    catchPokemon(input.value.toLowerCase())
    input.value=""
})


nextButton.addEventListener('click',()=>{
    pokemonId+=1
    catchPokemon(pokemonId)
})

prevButton.addEventListener('click', ()=>{
    if(pokemonId>0){
        pokemonId-=1
        catchPokemon(pokemonId)
    }

})
catchPokemon(pokemonId)








