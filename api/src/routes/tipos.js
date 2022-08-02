const { Router } = require('express')
const router= Router()
const { typeInDb } = require('./controllers')

router.get('/',async(req,res)=>{
    try{
        res.status(200).json(await typeInDb())
    }catch(err){
        res.status(404).send({msg: 'que me rompiste??!! D:'})
    }
})
module.exports = router