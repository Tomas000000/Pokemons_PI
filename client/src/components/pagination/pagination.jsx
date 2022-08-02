import React from 'react';
import './paginationCss.css'

export default function Paginado ({currentPokemonsPags, allPokemons, paginado}){
    const PageNumbers = []
    for (let i = 1; i <= Math.ceil(allPokemons / currentPokemonsPags); i++){
        PageNumbers.push(i)
    }
    return (
        <nav>
            <ul className='paginado'>
                {
                    PageNumbers?.map(number => (
                        <li className='index'>
                        <a onClick={() => paginado(number)}>{number}</a>
                        </li>))
                }
            </ul>
        </nav>
    )

}
