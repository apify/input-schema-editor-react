"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _clipboardCopy = _interopRequireDefault(require("clipboard-copy"));

var _shortid = require("shortid");

var _jsFileDownload = _interopRequireDefault(require("js-file-download"));

var _InputSchemaViewer = _interopRequireDefault(require("./InputSchemaViewer"));

var _SchemaImporter = _interopRequireDefault(require("./SchemaImporter"));

var _INPUT_SCHEMA = _interopRequireDefault(require("../constants/INPUT_SCHEMA"));

var _PropertyCard = _interopRequireDefault(require("./PropertyCard"));

var _PropertyModal = _interopRequireDefault(require("./PropertyModal"));

var _GeneralForm = _interopRequireDefault(require("./GeneralForm"));

require("../App.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InputSchemaConfigurator =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InputSchemaConfigurator, _React$Component);

  function InputSchemaConfigurator(props) {
    var _this;

    _classCallCheck(this, InputSchemaConfigurator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputSchemaConfigurator).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_ensureValidStructure", function (property) {
      var fields = _INPUT_SCHEMA.default.general.fields.concat(_INPUT_SCHEMA.default[property.type].fields).concat([{
        name: "uniqueKey"
      }]);

      var filtered = {};
      fields.forEach(function (_ref) {
        var type = _ref.type,
            key = _ref.name;
        var value = property[key];
        var shouldParseJson = type === "object" || type === "array";

        if (shouldParseJson && value) {
          value = JSON.parse(property[key]);
        }

        if (value || typeof property[key] === "boolean") {
          filtered[key] = value;
        }
      });
      return filtered;
    });

    _defineProperty(_assertThisInitialized(_this), "_createProperty", function () {
      _this.setState(function (prevState) {
        var newModal = Object.assign({}, prevState.modal);
        newModal.visible = true;
        return {
          modal: newModal
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_mockEmptyProperty", function () {
      return {
        "title": "Country",
        "type": "string",
        "description": "Select your country",
        "editor": "select",
        "enum": ["us", "de", "fr"],
        "enumTitles": ["USA", "Germany", "France"],
        "keyName": "country",
        "uniqueKey": (0, _shortid.generate)()
      };
    });

    _this.setStaticValue = _this.setStaticValue.bind(_assertThisInitialized(_this));
    _this._getJson = _this._getJson.bind(_assertThisInitialized(_this));
    _this.handleJsonChange = _this.handleJsonChange.bind(_assertThisInitialized(_this));
    _this.closeModal = _this.closeModal.bind(_assertThisInitialized(_this));
    _this.handleSave = _this.handleSave.bind(_assertThisInitialized(_this));
    _this.handleEdit = _this.handleEdit.bind(_assertThisInitialized(_this));
    _this.handleDelete = _this.handleDelete.bind(_assertThisInitialized(_this));
    _this.handleUpdate = _this.handleUpdate.bind(_assertThisInitialized(_this));
    _this.copyToClipboard = _this.copyToClipboard.bind(_assertThisInitialized(_this));
    _this.handleImport = _this.handleImport.bind(_assertThisInitialized(_this));
    _this.downloadFile = _this.downloadFile.bind(_assertThisInitialized(_this));
    _this.state = {
      config: {
        title: "Actor input schema",
        description: "This is actor input schema",
        schemaVersion: 1,
        type: "object",
        properties: [_this._mockEmptyProperty()],
        required: []
      },
      modal: {
        visible: false,
        propertyIndex: null
      },
      isEdit: false
    };
    return _this;
  }

  _createClass(InputSchemaConfigurator, [{
    key: "setStaticValue",
    value: function setStaticValue(event) {
      var key;
      var value;

      if (event.persist) {
        event.persist();
        value = event.target.value;
        key = event.target.name;
      } else {
        key = event.key;
        value = event.value;
      }

      this.setState(function (prevState) {
        var config = Object.assign({}, prevState.config);
        config[key] = value;
        return {
          config: config
        };
      });
    }
  }, {
    key: "handleSave",
    value: function handleSave(prop) {
      var _this2 = this;

      var property = this._ensureValidStructure(prop);

      this.setState(function (prevState) {
        var config = Object.assign({}, prevState.config);
        config.required = _this2._getUpdatedRequired(prevState, property);
        config.properties = config.properties.concat([property]);
        return {
          config: config
        };
      });
    }
  }, {
    key: "_getUpdatedRequired",
    value: function _getUpdatedRequired(prevState, property) {
      var required = prevState.config.required.concat([]);
      var index = required.find(function (key) {
        return key === property.keyName;
      });

      if (property.required && !index) {
        return required.concat([property.keyName]);
      }

      required.splice(index, 1);
      return required;
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(propertyIndex) {
      this.setState(function (prevState) {
        var config = Object.assign({}, prevState.config);
        config.properties.splice(propertyIndex, 1);
        return {
          config: config
        };
      });
    }
  }, {
    key: "handleUpdate",
    value: function handleUpdate(prop, index) {
      var _this3 = this;

      var property = this._ensureValidStructure(prop);

      this.setState(function (prevState) {
        var updatedConfig = Object.assign({}, prevState.config);
        updatedConfig.properties[index] = Object.assign({}, updatedConfig.properties[index], property);
        updatedConfig.required = _this3._getUpdatedRequired(prevState, property);
        return {
          config: updatedConfig,
          isEdit: false
        };
      });
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.setState(function (prevState) {
        var newModal = Object.assign({}, prevState.modal);
        newModal.visible = false;
        newModal.propertyIndex = -1;
        return {
          modal: newModal,
          isEdit: false
        };
      });
    }
  }, {
    key: "handleEdit",
    value: function handleEdit(propertyIndex) {
      this.setState({
        modal: {
          visible: true,
          propertyIndex: propertyIndex
        },
        isEdit: true
      });
    }
  }, {
    key: "handleJsonChange",
    value: function handleJsonChange(newJson) {
      this.setState(function (prevState) {
        var newConfig = prevState.config;
        var properties = Object.assign({}, newJson.properties);
        delete newJson.properties;
        Object.entries(newJson).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              key = _ref3[0],
              value = _ref3[1];

          newConfig[key] = value;
        });
        var newProperties = Object.entries(properties).map(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              key = _ref5[0],
              value = _ref5[1];

          var property = Object.assign({}, value);
          property.keyName = key;
          property.uniqueKey = (0, _shortid.generate)();
          property.required = newConfig.required.includes(key);
          return property;
        });
        newConfig.properties = newProperties;
        return {
          config: newConfig
        };
      });
    }
  }, {
    key: "handleImport",
    value: function handleImport(json) {
      this.handleJsonChange(JSON.parse(json));
    }
  }, {
    key: "copyToClipboard",
    value: function copyToClipboard() {
      return regeneratorRuntime.async(function copyToClipboard$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap((0, _clipboardCopy.default)(JSON.stringify(this._getJson(), null, 2)));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_getJson",
    value: function _getJson() {
      var config = this.state.config;
      var json = {
        title: config.title,
        description: config.description,
        type: config.type,
        schemaVersion: config.schemaVersion,
        properties: {},
        required: config.required
      };
      config.properties.forEach(function (prop) {
        var propToEdit = Object.assign({}, prop);
        var key = propToEdit.keyName;
        delete propToEdit.keyName;
        delete propToEdit.uniqueKey;
        delete propToEdit.required;
        json.properties[key] = propToEdit;
      });
      return json;
    }
  }, {
    key: "downloadFile",
    value: function downloadFile() {
      (0, _jsFileDownload.default)(JSON.stringify(this._getJson(), null, 2), 'INPUT_SCHEMA.json');
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          config = _this$state.config,
          modal = _this$state.modal,
          isEdit = _this$state.isEdit;
      var modalProperty = config.properties[modal.propertyIndex] || {
        "uniqueKey": (0, _shortid.generate)(),
        type: "string"
      };

      var AddNewButton = function AddNewButton(props) {
        return _react.default.createElement(_antd.Button, _extends({
          type: "primary",
          onClick: _this4._createProperty,
          style: {
            marginBottom: "16px"
          },
          icon: "plus-circle",
          block: true
        }, props), "ADD NEW PROPERTY");
      };

      return _react.default.createElement("div", null, _react.default.createElement(_antd.Row, {
        gutter: 16
      }, _react.default.createElement(_antd.Col, {
        span: 13,
        key: "config",
        style: {
          padding: "16px 20px 16px 30px"
        },
        className: "scrollable"
      }, _react.default.createElement(_antd.Typography.Title, {
        level: 2
      }, "Configure your input schema"), _react.default.createElement(_GeneralForm.default, _extends({}, config, {
        setStaticValue: this.setStaticValue
      })), _react.default.createElement("div", {
        className: "properties"
      }, _react.default.createElement("div", {
        style: {
          display: "flex",
          flexDirection: 'column',
          justifyContent: "space-between"
        }
      }, _react.default.createElement(_antd.Typography.Title, {
        level: 3
      }, "Properties"), _react.default.createElement(AddNewButton, null)), _react.default.createElement(_antd.Row, {
        type: "flex",
        gutter: [16, 16]
      }, config.properties.map(function (property, i) {
        var uniqueKey = property.uniqueKey;
        return _react.default.createElement(_antd.Col, {
          span: 12,
          key: property.uniqueKey
        }, _react.default.createElement(_PropertyCard.default, {
          property: property,
          propertyIndex: i,
          handleEdit: _this4.handleEdit,
          handleDelete: _this4.handleDelete,
          key: uniqueKey
        }));
      })), this.state.config.properties.length >= 3 && _react.default.createElement(AddNewButton, {
        style: {
          marginTop: "16px"
        }
      }))), _react.default.createElement(_antd.Col, {
        span: 11,
        key: "viewer",
        className: "scrollable json"
      }, _react.default.createElement(_antd.Typography.Title, {
        level: 2,
        className: "white"
      }, "Input Schema JSON"), _react.default.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px"
        }
      }, _react.default.createElement(_antd.Button, {
        onClick: this.copyToClipboard,
        type: "primary",
        icon: "copy"
      }, " COPY TO CLIPBOARD"), _react.default.createElement(_antd.Button, {
        onClick: this.downloadFile,
        icon: "cloud-download"
      }, " DOWNLOAD"), _react.default.createElement(_SchemaImporter.default, {
        handleImport: this.handleImport
      })), _react.default.createElement("div", null, _react.default.createElement(_InputSchemaViewer.default, {
        src: this._getJson(),
        handleChange: this.handleJsonChange
      })))), _react.default.createElement(_PropertyModal.default, {
        visible: modal.visible,
        property: modalProperty,
        isRequired: config.required.find(function (r) {
          return r === modalProperty.keyName;
        }),
        closeModal: this.closeModal,
        handleSave: this.handleSave,
        propertyIndex: modal.propertyIndex,
        properties: config.properties,
        isEdit: isEdit,
        handleUpdate: this.handleUpdate
      }));
    }
  }]);

  return InputSchemaConfigurator;
}(_react.default.Component);

var _default = InputSchemaConfigurator;
exports.default = _default;

//# sourceMappingURL=InputSchemaConfigurator.js.map