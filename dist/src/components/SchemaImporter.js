"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _SchemaImporterForm = _interopRequireDefault(require("./SchemaImporterForm"));

require("../App.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SchemaImporter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SchemaImporter, _React$Component);

  function SchemaImporter(props) {
    var _this;

    _classCallCheck(this, SchemaImporter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SchemaImporter).call(this, props));
    _this.handleOk = _this.handleOk.bind(_assertThisInitialized(_this));
    _this.closeModal = _this.closeModal.bind(_assertThisInitialized(_this));
    _this.openModal = _this.openModal.bind(_assertThisInitialized(_this));
    _this.state = {
      visible: false,
      message: null
    };
    return _this;
  }

  _createClass(SchemaImporter, [{
    key: "handleOk",
    value: function handleOk() {
      this.setState({
        visible: false,
        message: null
      });
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.handleOk();
    }
  }, {
    key: "openModal",
    value: function openModal() {
      this.setState({
        visible: true,
        message: null
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", null, _react.default.createElement(_antd.Button, {
        onClick: this.openModal,
        icon: "cloud-download"
      }, " IMPORT SCHEMA"), _react.default.createElement(_antd.Modal, {
        title: "Import existing input schema",
        visible: this.state.visible,
        onOk: this.handleOk,
        onCancel: this.closeModal,
        footer: [_react.default.createElement(_antd.Button, {
          key: "back",
          onClick: this.closeModal
        }, "Back"), _react.default.createElement(_antd.Button, {
          key: "submit",
          type: "primary",
          onClick: function onClick() {
            var form = _this2.formRef.props.form;
            form.validateFields(function (err, values) {
              if (err) {
                return;
              }

              try {
                _this2.props.handleImport(values.JSON);

                form.resetFields();

                _this2.closeModal();
              } catch (e) {
                _this2.setState({
                  message: e.message
                });
              }
            });
          }
        }, "Save")]
      }, _react.default.createElement(_SchemaImporterForm.default, {
        wrappedComponentRef: function wrappedComponentRef(ref) {
          _this2.formRef = ref;
        }
      }), this.state.message && _react.default.createElement(_antd.Typography.Text, {
        type: "danger"
      }, " ", this.state.message)));
    }
  }]);

  return SchemaImporter;
}(_react.default.Component);

;
var _default = SchemaImporter;
exports.default = _default;

//# sourceMappingURL=SchemaImporter.js.map