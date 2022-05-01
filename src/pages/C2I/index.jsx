import axios from 'axios'
import React, { Component } from 'react'

export default class C2I extends Component {
 
    componentDidMount(){
        console.log('test')
        axios({
            method:'get',
            url:'data/diagram',
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    render() {
    return (
        <div>C2I</div>
    )
    }
}
