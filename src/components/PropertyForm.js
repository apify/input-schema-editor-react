import React from "react";
import {Form, Input, InputNumber, Select, Checkbox} from 'antd';
import INPUT_CONFIGURATION_TYPES from "../constants/INPUT_SCHEMA";

class PropertyForm extends React.Component {
    constructor(props) {
        super(props);
        this.setPropertyValue = this.setPropertyValue.bind(this);
        this.state = {
            ...props.property
        }

    }

    setPropertyValue(event) {
        let key;
        let value;
        if (event.persist) {
            event.persist();
            value = event.target.value;
            key = event.target.name
        } else {
            key = event.key;
            value = event.value
        }
        this.setState({[key]: value})
    }

    _getField = (field) => {
        const {getFieldDecorator} = this.props.form;
        const config = {
            rules: [{required: field.required, message: `Please input your ${field.name}!`}],
            initialValue: this.state[field.name]
        };

        if(field.type === "boolean"){
            config.valuePropName = "checked"
        }

        return (<Form.Item key={field.name} label={field.name}>
                {getFieldDecorator(field.name, config)(
                    this._getInputField(field)
                )}
            </Form.Item>
        )
    };

    _getInputField = (field) => {
        const commonProps = {
            placeholder: field.name,
            onChange: (event) => this.setPropertyValue(event),
            name: field.name,
        };


        switch (field.type) {
            case "string":
                return <Input
                    {...commonProps}
                />
            case "integer":
                return <InputNumber
                    {...commonProps}
                    onChange={(value) => this.setPropertyValue({
                        key: field.name,
                        value
                    })
                    }
                />
            case "enum":
                return <Select {...commonProps} onChange={(value) => this.setPropertyValue({
                    key: field.name,
                    value
                })}>
                    {field.values.map(val => (<Select.Option value={val} key={val}>{val}</Select.Option>))}
                </Select>;
            case "type":
                field.type = this.state.type;
                return this._getInputField(field);
            case "boolean":
                return <Checkbox
                    {...commonProps}
                    onChange={(event) => this.setPropertyValue({
                        key: field.name,
                        value: event.target.checked
                    })
                    }
                />
            default:
                return <p>null</p>
        };
    }

    getGeneralFields = () => {
        return INPUT_CONFIGURATION_TYPES.general.fields.map(this._getField)
    };

    getExtraFields = () => {
        return INPUT_CONFIGURATION_TYPES[this.state.type].fields.map(this._getField)
    };

    render() {

        return (
            <Form layout={"inline"}>
                {this.getGeneralFields()}
                {this.getExtraFields()}
            </Form>
        );
    }
}

export default Form.create({name: 'property-form'})(PropertyForm);

