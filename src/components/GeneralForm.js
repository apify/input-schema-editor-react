import React from "react";
import {Input, Form, Typography, InputNumber} from "antd";

import '../App.css';

class GeneralForm extends React.Component {

    render() {

        const formItemLayout = {
            labelCol: {
                xs: {span: 4},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 12},
                sm: {span: 12},
            },
        };
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Typography.Title level={3}>
                    Metadata configuration
                </Typography.Title>
                <Form layout={"vertical"} {...formItemLayout}>
                    <Form.Item key={"title"} label={"title"}>
                        {getFieldDecorator("title", {
                            rules: [{required: true, message: `Please input "title"!`}],
                            initialValue: this.props.title
                        })(
                            <Input
                                placeholder={"title"}
                                name={"title"}
                                onChange={this.props.setStaticValue}
                            />
                        )}
                    </Form.Item>

                    <Form.Item key={"description"} label={"description"}>
                        {getFieldDecorator("description", {
                            rules: [{required: false, message: `Please input "description"!`}],
                            initialValue: this.props.description
                        })(
                            <Input.TextArea
                                placeholder={"description"}
                                name={"description"}
                                onChange={this.props.setStaticValue}
                            />
                        )}
                    </Form.Item>
                    <Form.Item key={"schemaVersion"} label={"schemaVersion"}>
                        {getFieldDecorator("schemaVersion", {
                            rules: [{required: false, message: `Please input "schemaVersion"!`}],
                            initialValue: this.props.schemaVersion
                        })(
                            <InputNumber
                                type={"textarea"}
                                name={"schemaVersion"}
                                onChange={(value) => this.props.setStaticValue({value, key: "schemaVersion"})}
                            />
                        )}
                    </Form.Item>

                    <Form.Item key={"type"} label={"type"}>
                        {getFieldDecorator("type", {
                            rules: [{required: false, message: `Please input "type"!`}],
                            initialValue: this.props.type
                        })(
                            <Input
                                placeholder={"type"}
                                name={"type"}
                                onChange={this.props.setStaticValue}
                            />
                        )}
                    </Form.Item>
                </Form>
            </div>
        )
    }

};
export default Form.create({name: 'general-form'})(GeneralForm);
