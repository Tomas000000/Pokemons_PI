import React from 'react'
import './loadingCss.css'
import  loading  from './QhVL.gif'

export default function Loading(){
    return (
        <div className='loading'>
            <img className='loadingImg' src ={loading} alt ='loading'/>
        </div>
    )
}