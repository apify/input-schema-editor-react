import React from 'react';
import {Typography, Row, Col, Button} from "antd";
import copy from 'clipboard-copy';
import shortid from 'shortid';

import Viewer from "./InputSchemaViewer"
import SchemaImporter from "./SchemaImporter";


import INPUT_CONFIGURATION_TYPES from "../constants/INPUT_SCHEMA";
import PropertyCard from "./PropertyCard";
import PropertyModal from "./PropertyModal";
import GeneralForm from "./GeneralForm";

class InputSchemaConfigurator extends React.Component {
    constructor(props) {
        super(props);
        this.setStaticValue = this.setStaticValue.bind(this);
        this._getJson = this._getJson.bind(this);
        this.handleJsonChange = this.handleJsonChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.handleImport = this.handleImport.bind(this);
        this.state = {
            config: {
                title: "Actor awesome input schema",
                description: "this is actor awesome input schema",
                schemaVersion: 1,
                type: "object",
                properties: [this._mockEmptyProperty()],
                required: [],
            },
            modal: {
                visible: false,
                propertyIndex: null,
            },
            isEdit: false,
        }

    }

    setStaticValue(event) {
        event.persist();
        const {target} = event;
        this.setState(prevState => {
            const config = Object.assign({}, prevState.config);
            config[target.name] = target.value;
            return {config}

        });
    }

    handleSave(prop) {
        const property = this._ensureValidStructure(prop);
        this.setState((prevState) => {
            const config = Object.assign({}, prevState.config);
            config.required = this._getUpdatedRequired(prevState, property);
            config.properties = config.properties.concat([property]);

            return {
                config,
            }
        })
    }

    _getUpdatedRequired(prevState, property) {
        let required = prevState.config.required.concat([]);
        const index = required.find(key => key === property.keyName);
        if (property.required && !index) {
            return required.concat([property.keyName])

        }

        required.splice(index, 1);
        return required


    }

    handleDelete(propertyIndex) {
        this.setState((prevState) => {
            const config = Object.assign({}, prevState.config);
            config.properties.splice(propertyIndex, 1);
            return {
                config
            }
        })
    }

    handleUpdate(prop) {
        const property = this._ensureValidStructure(prop);
        this.setState(prevState => {
            const updatedConfig = Object.assign({}, prevState.config);
            const index = prevState.config.properties.findIndex(prop => prop.id === property.id);

            updatedConfig.properties[index] = Object.assign({}, prevState.config.properties[index], property);
            updatedConfig.required = this._getUpdatedRequired(prevState, property);

            return {
                config: updatedConfig,
                isEdit: false
            }
        })
    }


    closeModal() {
        this.setState(prevState => {
            const newModal = Object.assign({}, prevState.modal);
            newModal.visible = false;
            return {
                modal: newModal
            }
        })
    }

    handleEdit(propertyIndex) {
        this.setState({
            modal: {
                visible: true,
                propertyIndex
            },
            isEdit: true
        })
    }

    _ensureValidStructure = (property) => {
        const getKey = (f) => f.name && f.name;
        const keys = INPUT_CONFIGURATION_TYPES.general.fields.map(getKey).concat(INPUT_CONFIGURATION_TYPES[property.type].fields.map(getKey));
        const filtered = {};
        keys.forEach(key => {
            const value = property[key];
            if (property[key] || typeof property[key] === "boolean") {
                filtered[key] = value
            }
        });

        return filtered
    };

    handleJsonChange(newJson) {
        this.setState(prevState => {
            const newConfig = prevState.config;
            const properties = Object.assign({}, newJson.properties);
            delete newJson.properties;
            Object.entries(newJson).forEach(([key, value]) => {
                newConfig[key] = value
            });
            const newProperties = Object.entries(properties).map(([key, value]) => {
                const property = Object.assign({}, value);
                property.keyName = key;
                property.id = shortid.generate();
                property.required = newConfig.required.includes(key);
                return property
            });
            newConfig.properties = newProperties;
            return {
                config: newConfig,
            }
        })
    }

    handleImport(json) {
        console.log(json);
        this.handleJsonChange(JSON.parse(json));
    }

    async copyToClipboard() {
        await copy(JSON.stringify(this._getJson(), null, 2));
    }

    _getJson() {
        const {config} = this.state;
        const json = {
            title: config.title,
            description: config.description,
            type: config.type,
            schemaVersion: config.schemaVersion,
            properties: {},
            required: config.required
        };
        config.properties.forEach(prop => {
            const propToEdit = Object.assign({}, prop);
            const key = propToEdit.keyName;
            delete propToEdit.keyName;
            delete propToEdit.id;
            delete propToEdit.required;

            json.properties[key] = propToEdit
        });
        return json
    }

    _createProperty = () => {
        this.setState((prevState) => {
            const newModal = Object.assign({}, prevState.modal);
            newModal.visible = true;
            return {
                modal: newModal
            }
        })
    };


    _mockEmptyProperty = () => {
        return {
            "title": "Country",
            "type": "string",
            "description": "Select your country",
            "editor": "select",
            "default": "us",
            "enum": ["us", "de", "fr"],
            "enumTitles": ["USA", "Germany", "France"],
            "keyName": "country",
            "id": shortid.generate(),
        }
    };


    render() {
        const {config, modal, isEdit} = this.state;
        const modalProperty = config.properties[modal.propertyIndex] || this._mockEmptyProperty();

        return (
            <div>
                <Row gutter={16} style={{padding: "16px"}}>
                    <Col span={12}>
                        <Typography.Title>
                            Configure your input schema
                        </Typography.Title>
                        <GeneralForm {...config} setStaticValue={this.setStaticValue}/>
                        <Typography.Title level={3}>
                            Properties
                        </Typography.Title>
                        <Row type="flex" gutter={[16, 16]}>
                            {config.properties.map((property, i) => {
                                const id = property.id;
                                delete property.id;
                                return (<Col span={12}>
                                        <PropertyCard
                                            property={property}
                                            propertyIndex={i}
                                            handleEdit={this.handleEdit}
                                            handleDelete={this.handleDelete}
                                            key={id}
                                        />
                                    </Col>
                                )
                            })}
                        </Row>
                        <Button
                            type={"primary"}
                            onClick={this._createProperty}
                            style={{marginTop: "16px"}}
                        >
                            Create new property
                        </Button>
                    </Col>

                    <Col span={12}>
                        <Typography.Title>
                            Input schema json
                        </Typography.Title>
                        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "16px"}}>
                            <Button onClick={this.copyToClipboard} type={"primary"}> Copy to clipboard</Button>
                            <SchemaImporter handleImport={this.handleImport}/>
                        </div>
                        <div>
                            <Viewer src={this._getJson()} handleChange={this.handleJsonChange}/>
                        </div>

                    </Col>
                </Row>
                <PropertyModal
                    visible={modal.visible}
                    property={modalProperty}
                    isRequired={config.required.find(r => r === modalProperty.keyName)}
                    closeModal={this.closeModal}
                    handleSave={isEdit ? this.handleUpdate : this.handleSave}
                />

            </div>
        )
    }
}

export default InputSchemaConfigurator;
