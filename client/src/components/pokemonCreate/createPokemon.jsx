import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CreatePokemon, getType, getPokemons } from '../../redux/actions/actions'
import './createPokemonCss.css'



export default function PostPokemon(){

function Validate(currentInput){
    let currentErrors = {}

    if(pokemons.find(poke => poke.name === currentInput.name.toLowerCase()))
        currentErrors.name = 'That pokemon already exists'
    if (!/^[A-Za-z\s]+$/g.test(currentInput.name)){
        currentErrors.name = 'Invalid name'
    }
    if (currentInput.name.length === 0){
        currentErrors.name = 'The Pokemon needs a name'
    }
    /* if (currentInput.types.length !== null){
        currentErrors.types = 'The pokemon needs a type'
    } */
    
    
   /*  if (currentInput.types.length === 2){
        currentErrorsTypes.types = 'The maximum of types is 2'
    } */
    if (currentInput.attack < 1)
        {currentErrors.attack = 'The attack min is 1'}

    if (currentInput.attack > 500 )
        {currentErrors.attack = 'The attack max is 500'}

    if (currentInput.weight < 1 )
        {currentErrors.weight = 'The weight min is 1'}

    if (currentInput.weight > 50 )
        {currentErrors.weight = 'The weight max is 50'}

    if (currentInput.height < 1)
        {currentErrors.height = 'The height min is 1'}

    if (currentInput.height > 50)
        {currentErrors.height = 'The height max is 50'}

    if (currentInput.defense < 1)
        {currentErrors.defense = 'The defense min is 1'}

    if (currentInput.defense > 500)
        {currentErrors.defense = 'The defense max is 500'}

    if (currentInput.speed < 1 )
        {currentErrors.speed = 'The speed min is 1'}

    if (currentInput.speed > 500)
        {currentErrors.speed = 'The speed max is 500'}

    if (currentInput.hp < 20 )
        {currentErrors.hp = 'The hp min is 20'}

    if (currentInput.hp > 100)
        {currentErrors.hp = 'The hp max is 100'}
    
        /* if (currentInput.height.length < 1 && currentInput.height > 100){
        currentErrors.height = 'Max height is 100 and Min is 1'
    } */

   /*  if (currentErrors.types.length === 1){
        currentErrors.types = 'The second type of the pokemon is optional'
    } */
   
     return currentErrors
    
}

 
    const history = useHistory()
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    const pokemons = useSelector ((state) => state.pokemons)
    const [currentErrors, setCurrentErrors] = useState({})
    const [currentErrorsTypes, setCurrentErrorsTypes] = useState({})
    const [currentInput, setCurrentImput] = useState({
        name: '',
        types: [],
        height: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        weight: '',
        img: ''
    })
    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getType())
    }, [dispatch])

    useEffect(() => {
        setCurrentErrors(Validate(currentInput))
        setCurrentErrorsTypes(Validate(currentInput))
    }, [currentInput])
   

    function handlerSelect(ev){
        
        if (!currentInput.types.includes(ev.target.value) && currentInput.types.length <= 1)
        setCurrentImput({
            ...currentInput,
            types: [...currentInput.types, ev.target.value]
        })
        setCurrentErrors(Validate({
            ...currentInput,
            types: [...currentInput.types, ev.target.value]
        }))
        console.log(currentInput)
    }

    function handlerDelete(ev){
        setCurrentImput({
            ...currentInput,
            types: currentInput.types.filter(type => type !== ev)
        })
    }

    function hanlderNameControl(ev){
        ev.preventDefault()
        setCurrentImput({
            ...currentInput,
            [ev.target.name] : ev.target.value
        })
        setCurrentErrors(Validate({
            ...currentInput,
            [ev.target.name] : ev.target.value
        }))
        console.log(currentInput)
        
    }
    function handlerNumbers(ev){
        ev.preventDefault()
        setCurrentImput({
            ...currentInput,
            [ev.target.name] : ev.target.value
        })
        setCurrentErrors(Validate({
            ...currentInput,
            [ev.target.name] : ev.target.value
        }))

    }
    
    
    function handlerImg(ev){
        setCurrentImput({
            ...currentInput,
            [ev.target.name] : ev.target.value
        })
    }

    function handlerSubmit(ev){
        ev.preventDefault()
        
        if(Object.keys(currentErrors).length===0 && currentInput.types.length >= 1){ 
            alert('Pokemon has create')
            dispatch(
            CreatePokemon(currentInput)
        )   
        setCurrentImput({
            name: "",
            types: [],
            height: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            weight: "",
            img: "",
        }) 
        
        history.push('/home')
    }else {
        alert('Please fill in all the information correctly')
    }
    }


    return (
        <div className='background1'>
        <img style ={{height: '136vh', width: '100%', objectFit: 'fixed'}} src='https://www.diariotiempo.com.ar/wp-content/uploads/2022/05/Un-fanatico-de-Pokemon-hace-un-impresionante-%C2%BFQuien-es-ese.jpg'/>
        <div className='form'>
            <Link to = '/home'><button>Go back</button></Link>
            <h1>Who is that Pokemon?!?!</h1>
            <from >
                <div>
                    <spam>Name :</spam>
                    <input name = 'name' type = 'text' placeholder = 'Pikachu...' value = {currentInput.name} onChange = {(ev) => hanlderNameControl(ev)} required/>
                    {
                        currentErrors.name && (<p className='alertName'>{currentErrors.name}</p>)
                    }
                </div>
                <div>
                <div>Types :
                <select disabled = {currentInput.types.length >= 2} name = 'types' value = {currentInput.types} onChange = {(ev) => handlerSelect(ev)}>
                    <option value = '' hidden>Select Type</option>
                    {
                        types.map(types => (
                            <option value = {types.name}>{types.name[0].toUpperCase() + types.name.substring(1)}</option>
                        ))
                    }
                    </select>
                    <ul>
                        <li>{currentInput.types.map(type=>
                            <div>
                                {type}
                                <button onClick={() => handlerDelete(type)} type="button">X</button>
                            </div>)}</li>
                    </ul>
                    </div>
                    <div>
                    {
                        currentErrors.types && (<p className='alertTypes'>{currentErrors.types}</p>)
                    }
                    </div>
                </div>
                <div>
                <spam>Height :</spam>
                
                    <input name='height' value = {currentInput.height} type = 'number' placeholder = '50...' onChange = {(ev) => handlerNumbers(ev)}/>
                    {
                        currentErrors.height && (<p className='alertHeight'>{currentErrors.height}</p>)
                    }
                </div>
                <div>
                <spam>Health Points (HP) :</spam>
                    <input name='hp' value = {currentInput.hp} type = 'number' placeholder = '100...' onChange = {(ev) => handlerNumbers(ev)}/>
                    {
                        currentErrors.hp && (<p className='alertHp'>{currentErrors.hp}</p>)
                    }
                </div>
                <div>
                <spam>Attack Power :</spam>
                    <input name='attack' value = {currentInput.attack} type = 'number' placeholder = '100...' onChange = {(ev) => handlerNumbers(ev)}/>
                    {
                        currentErrors.attack && (<p className='alertAttack'>{currentErrors.attack}</p>)
                    }
                </div>
                <div>
                <spam>Defense :</spam>
                    <input name='defense' value = {currentInput.defense} type = 'number' placeholder = '100...' onChange = {(ev) => handlerNumbers(ev)}/>
                    {
                        currentErrors.defense && (<p className='alertDefense'>{currentErrors.defense}</p>)
                    }
                </div>
                <div>
                <spam>Speed :</spam>
                    <input name = 'speed' value = {currentInput.speed} type = 'number' placeholder = '100...' onChange = {(ev) => handlerNumbers(ev)}/>
                    {
                        currentErrors.speed && (<p className='alertSpeed'>{currentErrors.speed}</p>)
                    }
                </div>
                <div>
                <spam>Weight :</spam>
                    <input name='weight' value = {currentInput.weight} type = 'number' placeholder = '50...' onChange = {(ev) => handlerNumbers(ev)}/>
                    {
                        currentErrors.weight && (<p className='alertSpeed'>{currentErrors.weight}</p>)
                    }
                </div>
                <div>
                <spam>Image :</spam>
                    <input name='img' value = {currentInput.img} type = 'text' placeholder = 'URL...' onChange = {(ev) => handlerImg(ev)}/>

                </div>
            <button onClick={handlerSubmit} type = "submit">Create a pokemon!!!</button>
            </from>
        </div>
            {/* <div>
            <img className='imgCreate' src = {'https://www.diariotiempo.com.ar/wp-content/uploads/2022/05/Un-fanatico-de-Pokemon-hace-un-impresionante-%C2%BFQuien-es-ese.jpg'}/>
            </div> */}
    </div>
    )
}