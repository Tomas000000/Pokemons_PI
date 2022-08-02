import React from 'react'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchPokemons } from '../../redux/actions/actions';
import './searchBarCss.css'


export default function SearchBar(){
    const dispatch = useDispatch()
    const [currentSearch, setCurrentSearch] = useState('')

    function handlerImputSearch(ev){
        ev.preventDefault()
    setCurrentSearch(ev.target.value)
    
    }

    function handlerBotonSearch(ev){
        ev.preventDefault()
        if (currentSearch.length < 1) {
            alert('Please write a Pokemon')
        }
        if (currentSearch.length !== 0 ){
            dispatch(SearchPokemons(currentSearch))
            setCurrentSearch ('')
        }
        setCurrentSearch ('')

    }
    return (
    <div className='SearchBar'>
        <input className='Input' onChange={(ev) => handlerImputSearch(ev)} type= 'text' placeholder="Search..." value= {currentSearch}></input>
        <button className='Button' onClick={(ev) => handlerBotonSearch(ev)} type='submit'>Search</button>
    </div>
    )
}