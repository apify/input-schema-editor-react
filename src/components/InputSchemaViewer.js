import React from "react";
import ReactJson from 'react-json-view'
import {JsonEditor as Editor} from 'jsoneditor-react';

import '../App.css';


const Viewer = (props)=>{
    return  <ReactJson src={props.src} name={false} enableClipboard={false} displayObjectSize={false}/>
}

export default Viewer
