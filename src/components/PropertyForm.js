import React from "react";
import {Form, Input, InputNumber, Select, Checkbox} from 'antd';
import INPUT_CONFIGURATION_TYPES from "../constants/INPUT_SCHEMA";

import '../App.css';

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

    _getField = (oldField, type) => {
        const {getFieldDecorator} = this.props.form;
        const field = Object.assign({}, oldField);
        const config = {
            rules: [{required: field.required, message: `Please input your ${field.name}!`}],
            initialValue: this.state[field.name]
        };
        if (field.type === "type") {
            field.type = this.state.type;
        }

        if (field.type === "boolean") {
            config.valuePropName = "checked"
        }

        if (field.type === "object" || field.type === "array") {
            config.initialValue = JSON.stringify(this.state[field.name], null, 2)
        }

        if (field.type === "enum") {
            config.getValueProps = (value) => {
                if (field.values.includes(value)) {
                    return {value};
                }
                this.setPropertyValue({value: field.values[0], key: field.name}); // a little bit dirty trick it could be done in state transitions function.
            }
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
        let inputComponent;


        switch (field.type) {
            case "string":
                inputComponent = <Input
                    {...commonProps}
                />
                break;
            case "integer":
                inputComponent = <InputNumber
                    {...commonProps}
                    onChange={(value) => this.setPropertyValue({
                        key: field.name,
                        value
                    })
                    }
                />
                break;
            case "enum":
                inputComponent = <Select
                    {...commonProps}
                    onChange={(value) => this.setPropertyValue({
                        key: field.name,
                        value
                    })}>
                    {field.values.map(val => (<Select.Option value={val} key={val}>{val}</Select.Option>))}
                </Select>;
                break;
            case "boolean":
                inputComponent = <Checkbox
                    {...commonProps}
                    onChange={(event) => this.setPropertyValue({
                        key: field.name,
                        value: event.target.checked
                    })
                    }
                />;
                break;
            case "object":
                inputComponent = <Input.TextArea
                    {...commonProps}
                />;
                break;
            case "array":
                inputComponent = <Input.TextArea
                    {...commonProps}
                />
                break;
            default:
                inputComponent = <p>null</p>
        }
        ;
        return inputComponent
    };

    _requiredFirst(x, y){
        return (x.required === y.required)? 0 : x.required? -1 : 1;
    }

    render() {
        let fieldConfigs = INPUT_CONFIGURATION_TYPES.general.fields.concat(INPUT_CONFIGURATION_TYPES[this.state.type].fields);

        //sort to have required field first
        fieldConfigs = fieldConfigs.sort(this._requiredFirst);

        return (
            <Form layout={"inline"}>
                {fieldConfigs.map((field) => this._getField(field, this.state.type))}
            </Form>
        );
    }
}

export default Form.create({name: 'property-form'})(PropertyForm);

