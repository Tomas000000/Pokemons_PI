import axios from 'axios'

export  function getPokemons (){
    return async function (dispatch){
        let obj = await axios ('http://localhost:3001/pokemons');
        dispatch ({
            type: 'GET_POKEMONS',
            payload: obj.data
        }) 
    }
}

export function SearchPokemons (name){
    return  function (dispatch){
      axios.get((`http://localhost:3001/pokemons?name=${name.trim()}`))
      .then(e => {dispatch({
        type: 'SEARCH_POKEMONS',
        payload: [e.data]
      })}).catch(() => alert(`${name} not found`))
     } 
  }

export function filterByType (payload){
  return {
    type: 'FILTER_BY_TYPE',
    payload
  }
}

export function getType (){
  return async function (dispatch) {
    let obj = await axios ('http://localhost:3001/types')
    dispatch({
      type: 'GET_TYPE',
      payload: obj.data
    })
  }
}


export function filterByApiOrDb (payload){
  return {
    type: 'FILTER_BY_API_OR_DB',
    payload
  }
}

export function filterByAscOrDesc (payload){
  return {
    type: 'FILTER_BY_ASC_OR_DESC',
    payload
  }
}

export function filterByAttack (payload){
  return {
    type: 'FILTER_BY_ATTACK',
    payload
  }
}

export function eventDetaill (payload){
  return async function (dispatch){
    const info = await axios.get(`http://localhost:3001/pokemons/${payload}`)

    return dispatch ({
      type: 'EVENT_DETAIL',
      payload: info.data
    })
  }
}

export function CreatePokemon(payload){
  return async function(dispatch){
  const info = await axios.post('http://localhost:3001/pokemons', payload)
  return info
  }
}

/* export function filterHp(payload){
  return {
    type: 'FILTER_HP',
    payload
  }

  
}
 */

/* export function CreatePokemon(payload){
  return async function(dispatch){
  const info = await axios.post('http://localhost:3001/pokemons', payload)
  return info
  }
} */

export function ClearState(){
  return {
    type: 'CLEAR_STATE'
  }
}
