import React from "react";
import {Input, Form, Typography} from "antd";

import '../App.css';

const GENERAL_FIELDS = [
    {
        name: "title",
        "required": true,
    },
    {
        name: "description",
        "required": false,
    },
    {
        name: "schemaVersion",
        "required": true,
        type: "integer"
    },
    {
        name: "type",
        "required": true,
        type: "string"
    },
];

class GeneralForm extends React.Component {

    _getField = (field) => {
        const {getFieldDecorator} = this.props.form;

        return (<Form.Item key={field.name} label={field.name}>
                {getFieldDecorator(field.name, {
                    rules: [{required: field.required, message: `Please input your ${field.name}!`}],
                    initialValue: this.props[field.name]
                })(
                    <Input placeholder={field.name} name={field.name} onChange={this.props.setStaticValue}/>
                )}
            </Form.Item>
        )
    };

    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 4 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 12 },
            },
        };
        return (
            <div>
                <Typography.Title level={3}>
                    Metadata configuration
                </Typography.Title>
                <Form layout={"vertical"} {...formItemLayout}>
                    {GENERAL_FIELDS.map(this._getField)}
                </Form>
            </div>
        )
    }

};
export default Form.create({name: 'general-form'})(GeneralForm);
