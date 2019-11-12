import React from "react";
import { Typography, Button, Modal} from "antd";
import SchemaImporterForm from "./SchemaImporterForm";

import '../App.css';

class SchemaImporter extends React.Component {
    constructor(props) {
        super(props);
        this.handleOk = this.handleOk.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.state = {
            visible: false,
            message: null
        }
    }

    handleOk() {
        this.setState({visible: false, message: null})
    }

    closeModal() {
        this.handleOk();
    }

    openModal() {
        this.setState({visible: true, message: null});
    }

    render() {
        return (
            <div>
                <Button onClick={this.openModal}> Import existing input schema</Button>

                <Modal
                    title={"Import existing input schema"}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.closeModal}
                    footer={[
                        <Button key="back" onClick={this.closeModal}>
                            Back
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => {
                            const {form} = this.formRef.props;
                            form.validateFields((err, values) => {
                                if (err) {
                                    return;
                                }
                                try {
                                    this.props.handleImport(values.JSON);
                                    form.resetFields();
                                    this.closeModal()
                                } catch (e) {
                                    this.setState({message: e.message})
                                }
                            });
                        }}>
                            Save
                        </Button>,
                    ]}
                >
                    <SchemaImporterForm
                        wrappedComponentRef={(ref) => {
                            this.formRef = ref
                        }}
                    />
                    {this.state.message && <Typography.Text type={"danger"}> {this.state.message}</Typography.Text>  }

                </Modal>
            </div>
        )
    }

};
export default SchemaImporter;
