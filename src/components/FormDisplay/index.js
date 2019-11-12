import React from "react";
import { Form, Input, Select } from "antd";
import _uniqueId from "lodash/uniqueId";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const FormDisplay = ({ modelFormData }) => {
  const { t: translate } = useTranslation();

  function renderInputText(field) {
    const { fieldName } = field;
    return (
      <Form.Item label={fieldName} key={_uniqueId()}>
        <Input placeholder="Digite aqui..." />
      </Form.Item>
    );
  }

  function renderSelect(field) {
    const { fieldName, fieldOptions } = field;

    return (
      <Form.Item label={fieldName} key={_uniqueId()}>
        <Select defaultValue={translate("messages.choose")} onChange={() => {}}>
          {fieldOptions.map(field => {
            return (
              <Option value={field} key={_uniqueId()}>
                {field}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    );
  }

  function generateField(field) {
    switch (field.fieldType) {
      case "text":
        return renderInputText(field);
      case "select":
        return renderSelect(field);
      case "checkbox":
        return `${field.fieldType} - ${field.fieldName}`;
      case "radio":
        return `${field.fieldType} - ${field.fieldName}`;
      default:
        return null;
    }
  }

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      {modelFormData.map(field => {
        return generateField(field);
      })}
    </Form>
  );
};

export default FormDisplay;
