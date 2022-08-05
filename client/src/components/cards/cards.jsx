import React from 'react'
import { Link } from 'react-router-dom'
import './cardsCss.css'


export default function Card({name, img, types, attack, id, hp}){
    return (
        <div className='Card'>
            <h2 className='name' ><Link to = {'/pokemons/' + id}>{name}</Link></h2>
            <h4 className='types'>{types}</h4>
            <h5><span>His attack power is </span> <span className='attack'>{attack}</span></h5>
            <img className='img' src={img ? img = img : img = 'https://pbs.twimg.com/profile_images/1813797232/image_400x400.jpg'} alt='prueba' width = '200px' height='230px'/>
            <h6 hidden>{hp}</h6>
        </div>
    )
}