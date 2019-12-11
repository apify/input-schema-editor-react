import React from "react";
import ReactJson from 'react-json-view'

import '../App.css';


const Viewer = (props)=>{
    return  <ReactJson src={props.src} name={false} enableClipboard={false} displayObjectSize={false} theme={"pop"}/>
}

export default Viewer
