import React, { useState, useEffect } from "react";
import { Select, Form, Row, Button, Icon } from "antd";
import { useTranslation } from "react-i18next";
import _startCase from "lodash/startCase";
import _uniqueId from "lodash/uniqueId";
import CreateInputTextConfig from "./components/CreateInputTextConfig";
import CreateSelectConfig from "./components/CreateSelectConfig";
import CreateCheckboxConfig from "./components/CreateCheckboxConfig";
import CreateInputRadioConfig from "./components/CreateInputRadioConfig";

const { Option } = Select;

const AddField = ({ fieldList, onSubmitAddField }) => {
  const { t: translate } = useTranslation();

  const [fieldType, setFieldType] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [fieldOptions, setFieldOptions] = useState([]);
  const [fieldConfig, setFieldConfig] = useState({});

  useEffect(() => {
    setFieldConfig({
      fieldType,
      fieldName,
      fieldOptions
    });
  }, [fieldType, fieldName, fieldOptions]);

  function handleChangeFieldType(value) {
    setFieldType(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      ...fieldConfig,
      fieldId: _uniqueId()
    };

    onSubmitAddField(data);
  }

  function handleChangeCreateInputTextConfig(value) {
    setFieldName(value);
  }

  function handleChangeCreateSelectConfig(data) {
    setFieldName(data.name);
    setFieldOptions(data.options);
  }

  function renderOptionLabel(name) {
    return name === "select"
      ? _startCase(name)
      : `Input Type - ${_startCase(name)}`;
  }

  function isDisabledField(name) {
    if (name === "text" || name === "select") {
      return false;
    }

    return true;
  }

  function renderFieldTypes() {
    return (
      <Select
        defaultValue={translate("messages.choose")}
        onChange={handleChangeFieldType}
      >
        {fieldList.map(field => {
          return (
            <Option
              value={field.name}
              key={_uniqueId()}
              disabled={isDisabledField(field.name)}
            >
              {renderOptionLabel(field.name)}
            </Option>
          );
        })}
      </Select>
    );
  }

  function renderFieldOptions() {
    switch (fieldType) {
      case "text":
        return (
          <CreateInputTextConfig
            onChageInputTextConfig={handleChangeCreateInputTextConfig}
          />
        );
      case "select":
        return (
          <CreateSelectConfig
            onChageSelectConfig={handleChangeCreateSelectConfig}
          />
        );
      case "checkbox":
        return <CreateCheckboxConfig />;
      case "radio":
        return <CreateInputRadioConfig />;
      default:
        return null;
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item label={translate("messages.whichField")} colon={false}>
        <Row>{renderFieldTypes()}</Row>
        {renderFieldOptions()}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          <Icon type="plus" /> {translate("messages.addField")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddField;
