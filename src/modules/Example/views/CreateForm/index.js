import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Icon } from "antd";
import { useTranslation } from "react-i18next";
import _concat from "lodash/concat";
import PageContent from "../../../../components/Layout/PageContent";
import AddField from "../../../../components/AddField";
import FormDisplay from "../../../../components/FormDisplay";

const CreateForm = () => {
  const { t: translate } = useTranslation();

  const [modalText, setModalText] = useState("Conteudo");
  const [isVisible, setIsVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fieldList, setFieldList] = useState([]);
  const [modelFormData, setModelFormData] = useState([]);

  useEffect(() => {
    setFieldList([
      { name: "text" },
      { name: "select" },
      { name: "checkbox" },
      { name: "radio" }
    ]);
  }, []);

  function showModal() {
    setIsVisible(true);
  }

  function handleModalCancel() {
    setIsVisible(false);
  }

  function getAddFieldData(data) {
    let newData = modelFormData;
    newData.push(data);

    return newData;
  }

  function handleSubmitAddField(data) {
    if (!!data.fieldType) {
      setModelFormData(getAddFieldData(data));
      handleModalCancel();
    }
  }

  return (
    <PageContent title={translate("messages.createForm")}>
      <Row>
        <Col span={4}>
          <h3>{translate("messages.creationDesk")}</h3>
          <Button type="primary" onClick={showModal}>
            <Icon type="plus" />
            {translate("messages.addField")}
          </Button>
        </Col>
        <Col span={6}>
          <h3>{translate("messages.screen")}</h3>
          <FormDisplay modelFormData={modelFormData} />
        </Col>
      </Row>
      {isVisible && (
        <Modal
          title={translate("messages.addField")}
          visible={isVisible}
          confirmLoading={confirmLoading}
          onCancel={handleModalCancel}
          footer={null}
        >
          <AddField
            fieldList={fieldList}
            onSubmitAddField={handleSubmitAddField}
          />
        </Modal>
      )}
    </PageContent>
  );
};

export default CreateForm;
