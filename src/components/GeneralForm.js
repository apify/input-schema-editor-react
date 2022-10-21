import React from "react";
import {Input, Form, Typography} from "antd";

import '../App.css';

class GeneralForm extends React.Component {

    render() {

        const formItemLayout = {
            labelCol: {
                xs: {span: 6},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 12},
                sm: {span: 12},
            },
        };
        const {getFieldDecorator} = this.props.form;

        return (
            <div className={"metadata"}>
                <Typography.Title level={3}>
                    Metadata
                </Typography.Title>
                <Form layout={"vertical"} {...formItemLayout}>
                    <Form.Item key={"title"} label={"Title"}>
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

                    <Form.Item key={"description"} label={"Description"}>
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
                </Form>
            </div>
        )
    }

};
export default Form.create({name: 'general-form'})(GeneralForm);
