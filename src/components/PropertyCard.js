import React from "react";
import {Button, Card} from 'antd';
import '../App.css';

const PropertyCard = (props) => {
    return (
        <Card
            title={props.property.keyName}
            size={"small"}
            style={{height: "100%", border: "1px solid #1890ff"}}
        >
            <div style={{height: "100%", marginBottom: "12px", display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                {Object.entries(props.property).map(([key, value]) => {
                    if (key === "title" || key === "type" || key === "editor")
                        return (<div key={key}>{key}: {value}</div>)
                    return null;
                })}
            </div>


            <div style={{height: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start"}}>
                <Button onClick={() => props.handleEdit(props.propertyIndex)} type={"primary"}
                        style={{marginRight: "16px"}} icon={"edit"} block> EDIT</Button>
                <Button onClick={() => props.handleDelete(props.propertyIndex)} type={"danger"} icon={"delete"} block> DELETE</Button>
            </div>
        </Card>
    );
};

export default PropertyCard

