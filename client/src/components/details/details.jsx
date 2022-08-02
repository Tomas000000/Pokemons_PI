import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { eventDetaill, ClearState } from '../../redux/actions/actions'
import { Link, useParams } from 'react-router-dom'
import Loading from '../loading/loading'
import './detailsCss.css'

export default function Details(props){
    console.log(props)
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(ClearState())
        dispatch(eventDetaill(id))
    },[dispatch, id])
    

    const detailState = useSelector((state) => state.details)
        
    return (
        <div>
    

               
            {
                Object.keys(detailState).length ?
            
            
            <div className='CardDetail'>
                <h1>{detailState.name[0].toUpperCase() + detailState.name.substring(1)}</h1>
            
                <h3>Types: {detailState.types.map(poke => poke[0].toUpperCase() + poke.slice(1)+' ')}</h3>
            
                <img src = {detailState.img? detailState.img = detailState.img : detailState.img = 'https://pbs.twimg.com/profile_images/1813797232/image_400x400.jpg'} alt='prueba' width = '200px' height='230px'/>
            
            
                <h3>Hp: <span className='hp'>{detailState.hp}</span></h3>
                <h3>Attack: <span className='attack'>{detailState.attack}</span></h3>
                <h3>Defense: <span className='defense'>{detailState.defense}</span></h3>
                <h3>Speed: <span className='speed'>{detailState.speed}</span></h3>
                <h5>Height: <span className='height'>{detailState.height}</span></h5>
                <h5>Weight: <span className='weight'>{detailState.weight}</span></h5>

                </div>
            :<div><Loading/></div>
          
              
                }
                <Link to ='/home'> <button className='Back'>Go Back</button></Link>
                
        
    </div>)
}