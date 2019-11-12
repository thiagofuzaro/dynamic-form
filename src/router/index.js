import React from "react";
import { useTranslation } from "react-i18next";
import { Switch, Route } from "react-router";
import Layout from "../components/Layout";
import Example from "../modules/Example";
import PageContent from "../components/Layout/PageContent";

const Router = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route
          exact
          path="/example/list"
          render={props => <Example {...props} view="listDemo" />}
        />
        <Route
          exact
          path="/example/create-form"
          render={props => <Example {...props} view="create-form" />}
        />
      </Switch>
    </Layout>
  );
};

const Index = () => {
  const { t: translate } = useTranslation();

  return <PageContent title={translate("title")}></PageContent>;
};

export default Router;
