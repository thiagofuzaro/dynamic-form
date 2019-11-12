import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _mock_getExampleList } from "../../actions";
import { useTranslation } from "react-i18next";
import PageContent from "../../../../components/Layout/PageContent";
import { List, Typography, Skeleton, Empty, Result, Icon } from "antd";

const ListDemo = () => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_mock_getExampleList());
  }, []);

  const { exampleList, empty, fail, loading } = useSelector(
    state => state.example.examples
  );

  const renderList = () => {
    if (loading) {
      return <Skeleton active />;
    }

    if (empty) {
      return <Empty />;
    }

    if (fail) {
      return <Result status="warning" title={"Problems"} />;
    }

    return (
      <List
        header={
          <div>
            <Icon type="user" /> <b>{translate("messages.participants")}</b>
          </div>
        }
        footer={<div>{translate("messages.updatedList")}</div>}
        bordered
        dataSource={exampleList}
        renderItem={item => (
          <List.Item>
            <Typography.Text>
              <Icon type="user" />
            </Typography.Text>{" "}
            {item}
          </List.Item>
        )}
      />
    );
  };

  return (
    <PageContent title={translate("messages.listDemo")}>
      {renderList()}
    </PageContent>
  );
};

export default ListDemo;
