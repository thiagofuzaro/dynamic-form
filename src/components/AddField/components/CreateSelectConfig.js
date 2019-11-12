import React, { useState, useEffect } from "react";
import { Form, Input, Button, Icon } from "antd";
import _uniqueId from "lodash/uniqueId";
import _map from "lodash/map";
import { useTranslation } from "react-i18next";

const CreateSelectConfig = ({ onChageSelectConfig }) => {
  const { t: translate } = useTranslation();
  const [fieldOptions, setFieldOptions] = useState([]);
  const [inputName, setInputName] = useState("");
  const [optionsValue, setOptionsValue] = useState([]);

  useEffect(() => {
    let data = {
      name: inputName,
      options: optionsValue
    };

    onChageSelectConfig(data);
  }, [inputName, optionsValue]);

  function addField() {
    setFieldOptions([
      ...fieldOptions,
      {
        id: fieldOptions.length + 1,
        value: _uniqueId()
      }
    ]);
  }

  function onChangeName(e) {
    setInputName(e.target.value);
  }

  function onBlurNewField(e) {
    let data = {
      name: inputName,
      options: optionsValue
    };

    !!e.target.value && setOptionsValue([...optionsValue, e.target.value]);
  }

  function renderInputText(option) {
    return (
      <Form.Item label={`Opcão - ${option.id}`} colon={false} key={option.id}>
        <Input placeholder="Digite aqui..." onBlur={onBlurNewField} />
      </Form.Item>
    );
  }

  return (
    <>
      <Form.Item label="Qual o nome do campo?" colon={false}>
        <Input placeholder="Digite aqui..." onChange={e => onChangeName(e)} />
      </Form.Item>
      {fieldOptions.map(option => {
        return renderInputText(option);
      })}
      <Form.Item>
        <Button type="dashed" onClick={addField}>
          <Icon type="plus" /> {translate("messages.addOption")}
        </Button>
      </Form.Item>
    </>
  );
};

export default CreateSelectConfig;
