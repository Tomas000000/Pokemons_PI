const { Router, json } = require ('express')
const { Pokemon, Type } = require('../db')
const { getPokemonsByName, getAllPokemons, pokemonId, createPokemon } = require ('./controllers')

const router = Router()
router.use(json())

router.get('/', async (req,res)=>{
    try{
        let {name} = req.query
        if(!name) return res.status(200).json(await getAllPokemons())
        res.status(200).json(await getPokemonsByName(name))
    }catch(err){
        res.status(404).json(err.message)
    }
})

router.get('/:id', async (req,res)=>{
    try{
        let {id} = req.params
        res.status(200).send(await pokemonId(id))
    }catch(err){
        res.status(404).json(err.message)
    }
})

router.post('/',async(req,res)=>{
    try{
        let {name,height,hp,attack,defense,speed,weight,types,img, InDB} = req.body
        res.status(200).json(await createPokemon(name,height,hp,attack,defense,speed,weight,types,img, InDB))
    }catch(err){
        res.status(400).json(err.message)
    }
})

module.exports = router 