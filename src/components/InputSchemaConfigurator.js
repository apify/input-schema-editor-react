import React from 'react';
import {Typography, Row, Col, Button, message} from "antd";
import copy from 'clipboard-copy';
import {generate} from 'shortid';
import fileDownload from "js-file-download"

import Viewer from "./InputSchemaViewer"
import SchemaImporter from "./SchemaImporter";


import INPUT_CONFIGURATION_TYPES from "../constants/INPUT_SCHEMA";
import PropertyCard from "./PropertyCard";
import PropertyModal from "./PropertyModal";
import GeneralForm from "./GeneralForm";

import '../App.css';


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
        this.loadSchemaFromCli = this.loadSchemaFromCli.bind(this);
        this.sendSchemaToCli = this.sendSchemaToCli.bind(this);
        this.finishEditingInCli = this.finishEditingInCli.bind(this);
        this.handleWindowClosed = this.handleWindowClosed.bind(this);
        this.saveAndFinish = this.saveAndFinish.bind(this);
        this.handleImport = this.handleImport.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.state = {
            config: {
                title: "Actor input schema",
                description: "This is actor input schema",
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
            localCliPort: null,
            localCliToken: null,
            isEditingFinished: false,
        }
    }

    getLocalCliApiUrl(endpoint = '/') {
        const { localCliApiVersion, localCliPort, localCliToken } = this.state;
        const apiVersionUrlPart = localCliApiVersion ? `/${localCliApiVersion}` : '';
        const tokenUrlPart = localCliToken ? `?token=${localCliToken}` : '';

        if (!endpoint.startsWith('/')) endpoint = `/${endpoint}`;

        return `http://localhost:${localCliPort}/api${apiVersionUrlPart}${endpoint}${tokenUrlPart}`;
    }

    async componentDidMount() {
        const parsedUrl = new URL(window.location.href);
        const localCliPort = parsedUrl.searchParams.get('localCliPort');
        const localCliToken = parsedUrl.searchParams.get('localCliToken');
        const localCliApiVersion = parsedUrl.searchParams.get('localCliApiVersion');

        if (localCliPort) {
            this.setState({
                localCliPort,
                localCliToken,
                localCliApiVersion,
            }, async () => await this.loadSchemaFromCli());

            parsedUrl.searchParams.delete('localCliPort');
            parsedUrl.searchParams.delete('localCliToken');
            parsedUrl.searchParams.delete('localCliApiVersion');
            window.history.replaceState(null, '', parsedUrl.href)

            window.addEventListener('beforeunload', async () => {
                await this.handleWindowClosed();
            });
        }
    }

    async loadSchemaFromCli() {
        try {
            const apiUrl = this.getLocalCliApiUrl('/input-schema');
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(await response.text());
            }

            const schema = await response.json();
            this.handleJsonChange(schema);

            message.success('Schema loaded from Apify CLI');

            return true;
        } catch (err) {
            console.error(err);
            message.error('Could not load input schema from Apify CLI, check the browser console for errors');
            return false;
        }
    }

    async sendSchemaToCli() {
        try {
            const schema = this._getJson();

            const apiUrl = this.getLocalCliApiUrl('/input-schema');
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(schema),
            });
            if (!response.ok) {
                throw new Error(await response.text());
            }

            message.success('Schema saved to Apify CLI');

            return true;
        } catch (err) {
            console.error(err);
            message.error('Could not save input schema to disk, check the browser console for errors');
            return false;
        }
    }

    async finishEditingInCli(isWindowBeingClosed = false) {
        try {
            const apiUrl = this.getLocalCliApiUrl('/exit');
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isWindowClosed: isWindowBeingClosed }),
                keepalive: true,
            });
            if (!response.ok) {
                throw new Error(await response.text());
            }

            this.setState({ isEditingFinished: true });
            message.success('Editing in Apify CLI finished');

            return true;
        } catch (err) {
            console.error(err);
            message.error('Could not send finish command to Apify CLI, check the browser console for errors');
            return false;
        }
    }

    async handleWindowClosed() {
        if (!this.state.isEditingFinished) {
            await this.finishEditingInCli(true);
        }
    }

    async saveAndFinish() {
        if (await this.sendSchemaToCli()) {
            await this.finishEditingInCli();
        }
    }

    setStaticValue(event) {
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
        this.setState(prevState => {
            const config = Object.assign({}, prevState.config);
            config[key] = value;
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
            config.required = this._getUpdatedRequired(prevState, config.properties[propertyIndex]);
            config.properties.splice(propertyIndex, 1);
            return {
                config
            }
        })
    }

    handleUpdate(prop, index) {
        const property = this._ensureValidStructure(prop);
        this.setState(prevState => {
            const updatedConfig = Object.assign({}, prevState.config);

            updatedConfig.properties[index] = Object.assign({}, property);
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
            newModal.propertyIndex = -1;
            return {
                modal: newModal,
                isEdit: false,
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
        const fields = INPUT_CONFIGURATION_TYPES.general.fields.concat(INPUT_CONFIGURATION_TYPES[property.type].fields).concat([{name: "uniqueKey"}]);
        const filtered = {};
        fields.forEach(({type, name: key}) => {
            let value = property[key];
            const shouldParseJson = type === "object" || type === "array";

            if (shouldParseJson && value) {
                value = JSON.parse(property[key])
            }

            if (value || typeof property[key] === "boolean") {
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
                property.uniqueKey = generate();
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
            delete propToEdit.uniqueKey;
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
            "enum": ["us", "de", "fr"],
            "enumTitles": ["USA", "Germany", "France"],
            "keyName": "country",
            "uniqueKey": generate(),
        }
    };

    downloadFile() {
        fileDownload(JSON.stringify(this._getJson(), null, 2), 'INPUT_SCHEMA.json');

    }

    render() {
        const {config, modal, isEdit} = this.state;
        const modalProperty = config.properties[modal.propertyIndex] || {"uniqueKey": generate(), type: "string"};

        const AddNewButton = (props) => (
            <Button
                type={"primary"}
                onClick={this._createProperty}
                style={{marginBottom: "16px"}}
                icon={"plus-circle"}
                block
                {...props}
            >
                ADD NEW PROPERTY
            </Button>
        );

        return (
            <div>
                <Row gutter={16}>
                    <Col span={13} key={"config"} style={{padding: "16px 20px 16px 30px"}} className={"scrollable"}>
                        <Typography.Title level={2}>
                            Configure your input schema
                        </Typography.Title>

                        <GeneralForm {...config} setStaticValue={this.setStaticValue}/>
                        <div className={"properties"}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: 'column',
                                    justifyContent: "space-between",
                                }}>
                                <Typography.Title level={3}>
                                    Properties
                                </Typography.Title>
                                <AddNewButton/>
                            </div>
                            <Row type="flex" gutter={[16, 16]}>
                                {config.properties.map((property, i) => {
                                    const uniqueKey = property.uniqueKey;
                                    return (<Col span={12} key={property.uniqueKey}>
                                            <PropertyCard
                                                property={property}
                                                propertyIndex={i}
                                                handleEdit={this.handleEdit}
                                                handleDelete={this.handleDelete}
                                                key={uniqueKey}
                                            />
                                        </Col>
                                    )
                                })}
                            </Row>
                            {this.state.config.properties.length >= 3 && <AddNewButton style={{marginTop: "16px"}}/>}
                        </div>

                    </Col>
                    <Col span={11} key={"viewer"}
                         className={"scrollable json"}
                    >
                        <Typography.Title level={2} className={"white"}>
                            Input Schema JSON
                        </Typography.Title>
                        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "16px"}}>
                            <SchemaImporter handleImport={this.handleImport}/>
                            {this.state.localCliPort ? (<>
                                <Button onClick={this.sendSchemaToCli} type={"primary"} icon={"save"}> SAVE TO DISK</Button>
                                <Button onClick={this.saveAndFinish} type={"primary"} icon={"save"}> SAVE AND FINISH</Button>
                            </>) : (<>
                                <Button onClick={this.copyToClipboard} type={"primary"} icon={"copy"}> COPY TO CLIPBOARD</Button>
                                <Button onClick={this.downloadFile} icon={"cloud-download"}> DOWNLOAD</Button>
                            </>)}
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
                    handleSave={this.handleSave}
                    propertyIndex={modal.propertyIndex}
                    properties={config.properties}
                    isEdit={isEdit}
                    handleUpdate={this.handleUpdate}
                />

            </div>
        )
    }
}

export default InputSchemaConfigurator;
