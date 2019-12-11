import {Modal, Button, message} from "antd";
import React from "react";
import PropertyForm from "./PropertyForm";

import '../App.css';

const propertyModal = (props) => {
    let formRef;
    const title = props.property.title || "CREATING NEW PROPERTY";

    const saveFormRef = formReference => {
        formRef = formReference;
    };
    return (
        <Modal
            title={title}
            visible={props.visible}
            onOk={props.handleOk}
            onCancel={props.closeModal}
            style={{ top: 20 }}
            footer={[
                <Button key="back" onClick={props.closeModal}>
                    Back
                </Button>,
                <Button key="submit" type="primary" onClick={() => {
                    const {form} = formRef.props;
                    form.validateFields((err, values) => {
                        if (err) {
                            return;
                        }
                        let submit;
                        const finish = () => {
                            values.uniqueKey = props.property.uniqueKey;

                            submit(values, props.propertyIndex);
                            form.resetFields();
                            props.closeModal()
                        };

                        if (props.isEdit) {
                            submit = props.handleUpdate;
                            finish();
                        } else {
                            submit = props.handleSave;

                            // ensure keyName is unique
                            if (props.properties.find(prop => prop.keyName === values.keyName)) {
                                message.error(`Property with keyName "${values.keyName}" already exist`)

                            }else {
                                finish();
                            }

                        }
                    });
                }}>
                    Save
                </Button>,
            ]}
        >
            {props.visible && <PropertyForm
                property={props.property}
                isRequired={props.isRequired}
                wrappedComponentRef={saveFormRef}
            />}
        </Modal>
    )
};

export default propertyModal
