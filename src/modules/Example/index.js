import React from "react";
import ListDemo from "./views/ListDemo";
import CreateForm from "./views/CreateForm";

const Example = ({ view }) => {
  const renderSubRoute = () => {
    switch (view) {
      case "create-form":
        return <CreateForm />;
      case "listDemo":
        return <ListDemo />;
      default:
        return null;
    }
  };

  return renderSubRoute();
};

Example.defaultProps = {
  view: "create-form"
};

export default Example;
