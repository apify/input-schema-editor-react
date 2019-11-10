import {Modal, Button} from "antd";
import React from "react";
import PropertyForm from "./PropertyForm";

const propertyModal = (props) => {
    let formRef;
    const {title} = props.property;

    const saveFormRef = formReference => {
        formRef = formReference;
    };
    return (
        <Modal
            title={title}
            visible={props.visible}
            onOk={props.handleOk}
            onCancel={props.closeModal}
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
                        values.uniqueKey = props.property.uniqueKey;

                        props.handleSave(values);
                        form.resetFields();
                        props.closeModal()
                    });
                }}>
                    Save
                </Button>,
            ]}
        >
            { props.visible && <PropertyForm
                property={props.property}
                isRequired={props.isRequired}
                wrappedComponentRef={saveFormRef}
            />}
        </Modal>
    )
};

export default propertyModal