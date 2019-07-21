import React from 'react';
import logo from '../../resources/images.png'
import './Error.css'

const Error = () =>{
    return(
        <div className="conatainer">
            <div className="row justify-content-center">
                <div className="col-sm text-center">
                    <div>               
                        <img src={logo}/>
                        <h1>Ooops....This is Error</h1></div>
                    </div>
            </div>
        </div>
    )
}

export default Error;