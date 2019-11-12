import React, { Fragment } from "react";
import { useHistory } from "react-router";
import { PageHeader, Layout } from "antd";
import styles from "./theme/index.module.scss";

const { Content } = Layout;

const PageContent = ({ title, children }) => {
  let history = useHistory();

  return (
    <Fragment>
      <PageHeader
        onBack={!!children ? () => history.goBack() : false}
        title={title}
      />
      <Content className={styles.pageContent}>{children}</Content>
    </Fragment>
  );
};

export default PageContent;
