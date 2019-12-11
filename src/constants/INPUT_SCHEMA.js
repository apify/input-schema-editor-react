const INPUT_CONFIGURATION_TYPES = {
    general: {
        fields: [
            {
                name: "type",
                values: ["string", "integer", "boolean", "array", "object"],
                type: "enum",
                required: true,
            },
            {
                name: "title",
                type: "string",
                required: true,
                props:{
                   className: "title"
                }
            },
            {
                name: "description",
                type: "string",
                required: true,
            }, {
                name: "keyName",
                type: "string",
                required: true,
            },
            {
                name: "default",
                type: "type",
            },
            {
                name: "sectionCaption",
                type: "string",
            },
            {
                name: "sectionDescription",
                type: "string",
            },
            {
                name: "required",
                type: "boolean",
                required: true,
            },
        ]
    },
    string: {
        fields: [
            {
                name: "editor",
                values: ["textfield", "json", "textarea", "javascript", "select", "hidden"],
                required: true,
                type: "enum",
            },
            {
                name: "prefill",
                type: "type",
            },
            {
                name: "pattern",
                type: "string"
            },
            {
                name: "minLength",
                type: "integer",
            },
            {
                name: "maxLength",
                type: "integer"
            },
            {
                name: "enum",
                type: "array"
            },
            {
                name: "enumTitles",
                type: "array"
            },
            {
                name: "nullable",
                type: "boolean"
            },
        ]
    },
    integer:{
        fields:[
            {
                name: "editor",
                values: ["number", "hidden"],
                type: "enum"
            },
            {
                name: "prefill",
                type: "type",
            },
            {
                name:"maximum",
                type: "integer",
            },
            {
                name:"minimum",
                type: "integer",
            },
            {
                name:"unit",
                type: "string",
            },
            {
                name:"nullable",
                type: "boolean",
            }
        ],
    },
    boolean:{
        fields:[
            {
                name: "editor",
                values: ["checkbox", "hidden"],
                type: "enum"
            },
            {
                name: "groupCaption",
                type: "string"
            },
            {
                name: "groupDescription",
                type: "string"
            },
            {
                name: "nullable",
                type: "boolean"
            }
        ]
    },
    object:{
        fields:[
            {
                name: "editor",
                values: ["json","proxy", "hidden"],
                type: "enum",
                required: true
            },
            {
                name: "prefill",
                type: "type",
            },
            {
                name: "patternKey",
                type: "string",
            },
            {
                name: "patternValue",
                type: "string",
            },
            {
                name: "maxProperties",
                type: "integer",
            },
            {
                name: "minProperties",
                type: "integer",
            },
            {
                name: "nullable",
                type: "boolean",
            },
        ]
    },
    array: {
        fields:[
            {
                name: "editor",
                values: ["json", "requestListSources", "pseudoUrls", "keyValue", "stringList", "hidden"],
                type: "enum",
                required: true,
            },
            {
                name: "prefill",
                type: "type",
            },
            {
                name: "placeholderKey",
                type: "string"
            },
            {
                name: "placeholderValue",
                type: "string"
            }, {
                name: "patternKey",
                type: "string"
            },
            {
                name: "patternValue",
                type: "string"
            },
            {
                name: "maxItems",
                type: "integer"
            },
            {
                name: "minItems",
                type: "integer"
            },
            {
                name: "uniqueItems",
                type: "boolean"
            },
            {
                name: "nullable",
                type: "boolean"
            },
        ]
    }

};
export default INPUT_CONFIGURATION_TYPES
