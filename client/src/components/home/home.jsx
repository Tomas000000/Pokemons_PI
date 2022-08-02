import React, { Fragment } from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons, filterByType, getType, filterByApiOrDb, filterByAscOrDesc, filterByAttack, ClearState } from '../../redux/actions/actions'
import { Link } from 'react-router-dom'
import Card from '../cards/cards'
import Paginado from '../pagination/pagination'
import SearchBar from '../searchBar/searchBar'
import Loading from '../loading/loading'
import './homeCss.css'



export default function Home (){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.allPokemons)
/*     const error = useSelector((state) => state.error) */
    const [currentStatePage, setCurrentStatePage] = useState(1)
    const [currentPokemonsPags, setCurrentPokemons] = useState(12)
    const indexLastPokemon = currentStatePage * currentPokemonsPags
    const indexFristPokemon = indexLastPokemon - currentPokemonsPags
    const currentCardsPokemons = allPokemons.slice(indexFristPokemon, indexLastPokemon)
    const [currentAscAndDesc, setCurrentAscAndDesc] = useState('')
    const [currentFilterApiOrDb, setCurrentFilterApiOrDb] = useState('')
    const [currentFilterByType, setCurrentFilterByType] = useState('')
    const [currentFilterAttack, setCurrentAttack] = useState('')
    
    
    
    const allTypes = useSelector((state) => state.types)

    const paginado = (pagNumer) => {
        setCurrentStatePage(pagNumer)
    }


    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getType())
    },[dispatch])

    function handlerReload(ev){
        ev.preventDefault()
        dispatch(getPokemons())

    }

    function handlerFilterByType(ev){
        ev.preventDefault()
        if (allPokemons.length < 1) alert('that type doesnt exist')
        dispatch(filterByType(ev.target.value))
 
        setCurrentFilterByType(ev.target.value)
        console.log(indexFristPokemon)
        console.log(indexLastPokemon)

    }
   
    function hanlderFilterByApiOrDb(ev){
        ev.preventDefault()
        dispatch(filterByApiOrDb(ev.target.value))

        setCurrentFilterApiOrDb(ev.target.value)
    }

    function handlerFilterByAscOrDesc(ev){
        ev.preventDefault()
        dispatch(filterByAscOrDesc(ev.target.value))

        setCurrentAscAndDesc (ev.target.value)

    }

    function handlerFilterByAttack(ev){
        ev.preventDefault()
        dispatch(filterByAttack(ev.target.value))

        setCurrentAttack(ev.target.value)
    }

    return (
        
        <body>
             <div>   <div>
        <nav className='Nav'>
           <div className='Title'>
                <h1>POKEMONS PI</h1>
                </div>
            <div className='SearchBar'>
                <SearchBar  
                    />
            </div>
            <div>
                <Link to = '/pokemons'><button className='buttonCre'>Create Pokemon</button></Link>
            </div>
            <div>
                <Link to = '/'><button className='buttonBack'>Go Landing page</button></Link>
            </div>
 
                        <div className='ButtonsTop'>
                         <button className='buttonRe' onClick={ev =>handlerReload(ev)}>Reload Pokemons</button>
                        </div>
            </nav>

                </div>
            <div className='Selects'>
            <select className='Select1' onChange={ev => handlerFilterByAscOrDesc(ev)}>
                <option hidden value = 'Normal'>A-Z</option>
                <option value = 'Asc'>Ascendent</option>
                <option value = 'Desc'>Decrecent</option>
            </select> 
            <select className='Select2' onChange={ev => hanlderFilterByApiOrDb(ev)}>
                <option value  = 'All'>API/DB</option>
                <option value = 'Api'>API</option>
                <option value = 'Db'>Data Base</option>
            </select>
            <select className='Select3' onChange={ev => handlerFilterByType(ev)}>
                <option hidden value = 'All'>Filter by Types</option>
                {
                    allTypes.map((type) => (
                    <option value = {type.name}>{type.name[0].toUpperCase() + type.name.substring(1)}</option>
                ))
                
                }
                
            </select> 
            <select className='Select4' onChange={ev => handlerFilterByAttack(ev)}>
                <option value hidden = 'All'>Powerfull</option>
                <option value = 'More'>More Powerfull</option>
                <option value = 'Less'>Less Powerfull</option>
            </select></div>
                </div>
            <div>{
                    currentCardsPokemons.length ?
            
                <Paginado
                    currentPokemonsPags = {currentPokemonsPags}
                    allPokemons = {allPokemons.length}
                    paginado = {paginado}
                />
            :<Loading
/>
                }<div className='divCard'>
                    { currentCardsPokemons.map(e =>{
                        return (
                            <div>
                            <Card name = {e.name[0].toUpperCase() + e.name.substring(1)}
                             img = {e.img} types = {'Types: ' + e.types.map(type => type[0].toUpperCase() + type.substring(1)).join(', ')}
                             attack = {e.attack} id = {e.id}/>
                            </div>
                        )
                    })}
              </div>
            </div>
                
            
        </body>
        
    )
}