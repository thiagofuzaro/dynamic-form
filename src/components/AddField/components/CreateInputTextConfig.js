import React from "react";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

const CreateInputTextConfig = ({ onChageInputTextConfig }) => {
  const { t: translate } = useTranslation();

  return (
    <Form.Item label="Qual o nome do campo?" colon={false}>
      <Input
        placeholder="Digite aqui..."
        onChange={e => onChageInputTextConfig(e.target.value)}
      />
    </Form.Item>
  );
};

export default CreateInputTextConfig;
