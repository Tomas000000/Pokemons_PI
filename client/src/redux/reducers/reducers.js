const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    details: [],

}

export default function rootReducer(state = initialState, action){
    switch (action.type){
        
        case 'GET_POKEMONS':
            
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case 'SEARCH_POKEMONS':
            return {
                ...state,
                allPokemons: action.payload
            }
        case 'GET_TYPE':
            return {
                ...state,
                types: action.payload
            }
        case 'EVENT_DETAIL':
            return {
                ...state,
                details: action.payload
            }
        case 'FILTER_BY_TYPE':
/*             let problem = state.error */
            

            /* let allPokemons = state.allPokemons
            let filterType = action.payload ? allPokemons.filter(poke => poke.types.includes(action.payload)) : allPokemons
            if (filterType.length < 1) {alert('Type not found'); return {...state, allPokemons: allPokemons}}
            if (action.payload === 'All') {
                return {
                    ...state,
                    allPokemons: allPokemons,
                    
                }
            }
            
            return {
                ...state,
                allPokemons: filterType,
                
            } */
            let allPokemons = state.pokemons
            let filterType = action.payload ? allPokemons.filter(poke => poke.types.includes(action.payload)) : allPokemons
                action.payload === "All" ? state.allPokemons = state.pokemons
                    : state.allPokemons = state.pokemons.filter(poke => poke.types.includes(action.payload))
                if (filterType.length < 1) {alert('Type not found'); return {...state, allPokemons: allPokemons}}
                return {
                    ...state,
                    allPokemons: state.allPokemons

                }
            

            case 'FILTER_BY_API_OR_DB':
                
            
                
            if (action.payload === "Api") state.allPokemons = state.pokemons.filter(poke => typeof poke.id === "number")
            if (action.payload === "Db") state.allPokemons = state.pokemons.filter(poke => typeof poke.id === 'string')
            if (action.payload === "All") state.allPokemons = state.pokemons
            return {
                ...state, 
                allPokemons: state.allPokemons,
            }
        
            case 'FILTER_BY_ASC_OR_DESC':
                 /* if(action.payload === 'Asc') state.allPokemons = state.allPokemons.sort(function(a, b){
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                })
                else if(action.payload === 'Desc') state.allPokemons = state.allPokemons.sort(function(a, b){
                    if(b.name < a.name) { return -1; }
                    if(b.name > a.name) { return 1; }
                    return 0;
                })
                 if (action.payload === "Normal") state.allPokemons = state.allPokemons.sort(function(a, b){
                    if(a.id < b.id) { return -1; }
                    if(a.id > b.id) { return 1; }
                    return 0; 
                })    */
                    const sortAZ = action.payload === "Asc" ? state.allPokemons.sort(function(a, b) {
                    if(a.name > b.name){
                        return 0
                    }
                    if(b.name > a.name) {
                        return -1
                    }
                    return 0
                }) :
                state.allPokemons.sort(function(a, b) {
                    if(a.name > b.name){
                        return -1
                    }
                    if(b.name > a.name) {
                        return 1
                    }
                    return 0
                })  

                return {
                    ...state,
                    allPokemons: sortAZ,
                }
            case 'FILTER_BY_ATTACK':
                /* if(action.payload === 'Less') state.pokemons = state.allPokemons.sort(function(a, b){
                    if(a.attack < b.attack) { return -1; }
                    if(a.attack > b.attack) { return 1; }
                    return 0;
                })
                if(action.payload === 'More') state.pokemons = state.allPokemons.sort(function(a, b){
                    if(b.attack < a.attack) { return -1; }
                    if(b.attack > a.attack) { return 1; }
                    return 0;
                })
                if (action.payload === "All") state.pokemons = state.allPokemons.sort(function(a, b){
                    if(a.id < b.id) { return -1; }
                    if(a.id > b.id) { return 1; }
                    return 0;
                }) */
                action.payload === "Less" ? state.allPokemons.sort(function(a, b) {
                    if(a.attack > b.attack){
                        return 1
                    }
                    if(b.attack > a.attack) {
                        return -1
                    }
                    return 0
                }) :
                state.allPokemons.sort(function(a, b) {
                    if(a.attack > b.attack){
                        return -1
                    }
                    if(b.attack > a.attack) {
                        return 1
                    }
                    return 0
                })

                return {
                    ...state,
                    allPokemons: state.allPokemons,
                }
               
            case 'CREATE_POKEMON':
                return {
                    ...state,
                }
            case 'CLEAR_STATE':
                return {
                    ...state,
                    details: {},
                }
            /* case 'FILTER_HP':
                const hp = action.payload === 'hp' ? state.allPokemons.filter(poke => poke.hp === 45) : state.allPokemons
                 const hp = state.allPokemons.filter(poke => {
                    poke.hp <= 20}) 
                    return{
                
                
                    ...state,
                    allPokemons: hp
                } */
            default:
                return state 
    }
    

}

