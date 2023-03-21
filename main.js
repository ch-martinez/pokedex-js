const main = document.getElementById('main')
const sprite_container = document.getElementById('sprite_container')
const template_data = document.getElementById('template_data').content
const btn_shiny = document.getElementById('btn_shiny')

const limit = 500
let pokeData = {
  pokemon: undefined,
  shiny: false
}

// Funciones

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const renderCard = (pokeData) => {
  const fragment = document.createDocumentFragment()
  const clone = template_data.cloneNode(true)
  
  if (pokeData.shiny) {
    clone.querySelector('#sprite').setAttribute('src',pokeData.pokemon.sprites.other["official-artwork"].front_shiny)
  }else{
    clone.querySelector('#sprite').setAttribute('src',pokeData.pokemon.sprites.other["official-artwork"].front_default)
  }

  clone.querySelector('#poke_id').textContent = `#${pokeData.pokemon.id}`
  clone.querySelector('#name').textContent = pokeData.pokemon.name
  clone.querySelector('#type_1').textContent = `${pokeData.pokemon.types[0].type.name}`
  clone.querySelector('#type_1').classList.add(`${pokeData.pokemon.types[0].type.name}-bg`)
  clone.querySelector('#card').classList.add(`${pokeData.pokemon.types[0].type.name}-bg`)

  /* Carga de tags de types y de background */
  if (pokeData.pokemon.types[1]?.type.name == undefined) {
    clone.querySelector('#type_2').classList.add('type-hide')
  }else{
    clone.querySelector('#type_2').textContent = `${pokeData.pokemon.types[1]?.type.name}`
    clone.querySelector('#type_2').classList.add(`${pokeData.pokemon.types[1]?.type.name}-bg`)
  }

  /* Carga de stats */
  clone.querySelector('#hp_value').textContent = pokeData.pokemon.stats[0].base_stat
  clone.querySelector('#atk_value').textContent = pokeData.pokemon.stats[1].base_stat
  clone.querySelector('#def_value').textContent = pokeData.pokemon.stats[2].base_stat
  clone.querySelector('#satk_value').textContent = pokeData.pokemon.stats[3].base_stat
  clone.querySelector('#sdef_value').textContent = pokeData.pokemon.stats[4].base_stat
  clone.querySelector('#spd_value').textContent = pokeData.pokemon.stats[5].base_stat
  
  /* Carga status bar de stats*/
  clone.querySelector('#hp_progress').setAttribute('value',pokeData.pokemon.stats[0].base_stat)
  clone.querySelector('#atk_progress').setAttribute('value',pokeData.pokemon.stats[1].base_stat)
  clone.querySelector('#def_progress').setAttribute('value',pokeData.pokemon.stats[2].base_stat)
  clone.querySelector('#satk_progress').setAttribute('value',pokeData.pokemon.stats[3].base_stat)
  clone.querySelector('#sdef_progress').setAttribute('value',pokeData.pokemon.stats[4].base_stat)
  clone.querySelector('#spd_progress').setAttribute('value',pokeData.pokemon.stats[5].base_stat)

  fragment.appendChild(clone)
  main.replaceChild(fragment,main.children[1])
}

const fetchData = async (nro) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nro}`)
    pokeData.pokemon = await res.json()
    renderCard(pokeData)
  } catch (error) {
    console.log(error)
  }
}

// Eventos

document.addEventListener('DOMContentLoaded', () => {
  fetchData(getRandomInt(1,limit))
})

btn_random.addEventListener('click', () => {
  fetchData(getRandomInt(1,limit))
})

btn_prev.addEventListener('click',() => {
  if (pokeData.pokemon.id > 0) {
    fetchData(pokeData.pokemon.id-1)
  }
})

btn_next.addEventListener('click',() => {
  if (pokeData.pokemon.id < limit) {
    fetchData(pokeData.pokemon.id+1)
  }
})

btn_shiny.addEventListener('click', () => {
  pokeData.shiny ? pokeData.shiny = false : pokeData.shiny = true
  fetchData(pokeData.pokemon.id)
})