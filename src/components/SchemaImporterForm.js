import React from "react";
import {Input, Form} from "antd";

const GENERAL_FIELDS = [
    {
        name: "JSON",
        "required": true,
    }
];

class SchemaImporterForm extends React.Component {

    _getField = (field) => {
        const {getFieldDecorator} = this.props.form;

        return (<Form.Item key={field.name} label={field.name}>
                {getFieldDecorator(field.name, {
                    rules: [{required: field.required, message: `Please input your ${field.name}!`}],
                    initialValue: this.props[field.name]
                })(
                    <Input.TextArea placeholder={field.name} name={field.name}/>
                )}
            </Form.Item>
        )
    };

    render() {
        return (
            <div>
                <Form layout={"vertical"}>
                    {GENERAL_FIELDS.map(this._getField)}
                </Form>
            </div>
        )
    }

};
export default Form.create({name: 'schema-importer-form'})(SchemaImporterForm);
