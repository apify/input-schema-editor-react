import React from "react";
import {Button, Descriptions, Card, Typography} from 'antd';


const PropertyCard = (props) => {
    return (
        <Card
            style={{height: "100%"}}
            bodyStyle={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%"}}
        >
            <Typography.Title level={4}>
                {props.property.keyName}
            </Typography.Title>
            <Descriptions>
                {Object.entries(props.property).map(([key, value]) => {
                    if (key === "title" || key === "type" || key === "editor")
                        return (<Descriptions.Item label={key} key={key}>{value}</Descriptions.Item>)
                })}
            </Descriptions>

            <div style={{height: "100%", display: "flex", alignItems: "flex-end"}}>
                <Button onClick={() => props.handleEdit(props.propertyIndex)} type={"primary"}
                        style={{marginRight: "16px"}}> Edit</Button>
                <Button onClick={() => props.handleDelete(props.propertyIndex)} type={"danger"}> Delete</Button>
            </div>
        </Card>
    );
};

export default PropertyCard

