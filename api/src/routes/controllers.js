const axios = require ('axios');
const { Pokemon, Type } = require('../db');


/* async function getPokemonNameByApi(name){
    try{
    if(name){
        let allPokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000").then(e => e.data.results)
        let filtered = allPokemons.filter(e => e.name.includes(name)).map(e => e.url)
        let promised = filtered.map(url => axios(url).then(e => e.data))
        promised = await Promise.all(promised)
        let finaljoin = promised.map(e => {
            return {
                id: e.id,
                name: e.name,
                hp: e.stats[0].base_stat,
                attack: e.stats[1].base_stat,
                defense : e.stats[2].base_stat,
                speed: e.stats[5].base_stat,
                height: e.height,
                weight: e.weight,
                type: e.types.map((t) => t.type.name),
                img: e.sprites.other.home.front_default || e.sprites.other["official-artwork"].front_default,
            }
        })

        return finaljoin
    }}catch {
        throw new Error(`The pokemon doesn't exist`)
    } 
} */

async function getPokemonNameByApi(value){
    try{
        const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase().trim()}`)
        const pokemonValue = {
            id:pokemon.data.id,
            name:pokemon.data.name,
            height:pokemon.data.height,
            hp:pokemon.data.stats[0].base_stat,
            attack: pokemon.data.stats[1].base_stat,
            defense: pokemon.data.stats[2].base_stat,
            speed: pokemon.data.stats[5].base_stat,
            weight: pokemon.data.weight,
            types: pokemon.data.types.map(m=>m.type.name),
            img: pokemon.data.sprites.versions["generation-v"]["black-white"].animated.front_default
        }
        return pokemonValue
    }catch(err){
        throw new Error(`The pokemon doesn't exist`)
    }
}

async function getPokemonsByName(name){
    let findNameInDb = await Pokemon.findAll({
        where:{name:name.toLowerCase().trim()},
        attributes:["id","name","hp","attack","defense","speed","height","weight","img",],
        include:{
            model: Type,
            attributes: ['name'],
            through:{
                attributes:[],
            },
        }
    })


    findNameInDb = findNameInDb.map(m=>{
        return {
        ...m.dataValues, 
       types: m.types?.map(m=>m.name)
    }})

    if(!findNameInDb[0]) return getPokemonNameByApi(name)

    return findNameInDb[0]
    
}

async function getAllPokemons(){
    const llamada1 = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=40`)
    const pokemonsLLamados1 = await llamada1.data.results.map(m=>{return axios.get(m.url)})

    
    const totalPokemons = [...pokemonsLLamados1]

    const resPromises = await Promise.all(totalPokemons)

    const pokemonsData = resPromises.map(p=>{
        return{ 
                id: p.data.id,
                name: p.data.name,
                img: p.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
                attack: p.data.stats[1].base_stat,
                types: p.data.types.map(m=>m.type.name),
              }
    })

    let llamadaDataDb = await Pokemon.findAll({
        attributes:['name','img','id','InDB','attack'],
        include:{
            model: Type,
            attributes: ['name'],
            through:{
                attributes:[],
            },
        }
    })

    llamadaDataDb = llamadaDataDb.map(m=>{
        return {
        ...m.dataValues, 
        types: m.types?.map(m=>m.name)
    }})

    let llamadaTotal = [...llamadaDataDb,...pokemonsData]

    return llamadaTotal
}

async function pokemonId(value){
    if(value.length>5){
        try{
            const findDbID= await Pokemon.findByPk(value, {include:Type})
            const detailOfPokemonInDb = {
                id:findDbID.id,
                name: findDbID.name,
                height:findDbID.height,
                hp:findDbID.hp,
                attack:findDbID.attack,
                defense:findDbID.defense,
                speed: findDbID.speed,
                weight: findDbID.weight,
                types: findDbID.types.map(m=>m.name),
                img: findDbID.img,
                InDB:findDbID.InDB
            }
            return detailOfPokemonInDb
        }catch(err){
            throw new Error(`The pokemon doesn't exist`)
        }
    }else{ 
        return getPokemonNameByApi(value)
    }
}

async function findPokemonInApi(name){
    let callApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`)
        .catch(()=>{ return false})
    if(callApi)return true
}

async function createPokemon(name,height,hp,attack,defense,speed,weight,types,img,InDB){
if(name){
    let findDB = await Pokemon.findOne({
            where: {name: name.toLowerCase().trim()}
        })
    if(await findPokemonInApi(name)) throw new Error('the pokemon already exists...')
    else if(findDB) throw new Error('the pokemon already exists...')
    else {let pokemonCreate= await Pokemon.create({
        name: name.toLowerCase().trim(),
        hp:hp,
        attack:attack,
        defense:defense,
        speed: speed,
        height:height,
        weight: weight,
        img: img,
        InDB:InDB
    })
    
    let typesDb = await Type.findAll({
        where: {name:types}
    })
    
    pokemonCreate.addType(typesDb)
    return 'Pokemon created successfully'
}
}else{
    return 'You must enter a name'
}
}

async function typeInDb(){
let typeInDb = await Type.findAll()

if(typeInDb.length===0){
    
    let llamadoALaApi = await axios.get('https://pokeapi.co/api/v2/type');
    let typeInApi = llamadoALaApi.data.results.map(t =>{return {name: t.name}});
    typeInDb = await Type.bulkCreate(typeInApi)

}
return typeInDb
}

module.exports = {
getPokemonsByName,
getAllPokemons,
pokemonId,
createPokemon,
typeInDb

}