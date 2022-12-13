import React from "react";
import MateriasBtn from "./MateriasBtn";

function RenderCondicional(props){
    return (<div>
        <h2>Renderizado Condicional</h2>
        {props.condicional=="home"?<MateriasBtn/>:null}
    </div>)
}

export default RenderCondicional;