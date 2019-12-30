"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _antd = require("antd");

var _react = _interopRequireDefault(require("react"));

var _PropertyForm = _interopRequireDefault(require("./PropertyForm"));

require("../App.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propertyModal = function propertyModal(props) {
  var formRef;
  var title = props.property.title || "CREATING NEW PROPERTY";

  var saveFormRef = function saveFormRef(formReference) {
    formRef = formReference;
  };

  return _react.default.createElement(_antd.Modal, {
    title: title,
    visible: props.visible,
    onOk: props.handleOk,
    onCancel: props.closeModal,
    style: {
      top: 20
    },
    footer: [_react.default.createElement(_antd.Button, {
      key: "back",
      onClick: props.closeModal
    }, "Back"), _react.default.createElement(_antd.Button, {
      key: "submit",
      type: "primary",
      onClick: function onClick() {
        var form = formRef.props.form;
        form.validateFields(function (err, values) {
          if (err) {
            return;
          }

          var submit;

          var finish = function finish() {
            values.uniqueKey = props.property.uniqueKey;
            submit(values, props.propertyIndex);
            form.resetFields();
            props.closeModal();
          };

          if (props.isEdit) {
            submit = props.handleUpdate;
            finish();
          } else {
            submit = props.handleSave; // ensure keyName is unique

            if (props.properties.find(function (prop) {
              return prop.keyName === values.keyName;
            })) {
              _antd.message.error("Property with keyName \"".concat(values.keyName, "\" already exist"));
            } else {
              finish();
            }
          }
        });
      }
    }, "Save")]
  }, props.visible && _react.default.createElement(_PropertyForm.default, {
    property: props.property,
    isRequired: props.isRequired,
    wrappedComponentRef: saveFormRef
  }));
};

var _default = propertyModal;
exports.default = _default;

//# sourceMappingURL=PropertyModal.js.map