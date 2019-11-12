import React, { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout as AntLayout, Menu, Icon, Dropdown } from "antd";
import styles from "./theme/index.module.scss";
import _map from "lodash/map";

const { Header, Sider, Footer } = AntLayout;
const { SubMenu } = Menu;

const Page = ({ children }) => {
  const { t: translate, i18n } = useTranslation();
  const changeLanguage = language => i18n.changeLanguage(language);
  const [collapsed, setCollapsed] = useState(false);
  const sideBarMenu = [
    {
      name: translate("messages.examples"),
      icon: "layout",
      subItems: [
        {
          name: translate("messages.createForm"),
          icon: "form",
          path: "/example/create-form"
        },
        {
          name: translate("messages.listDemo"),
          icon: "unordered-list",
          path: "/example/list"
        }
      ]
    }
  ];

  const renderSideBar = () => {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.sider}
      >
        <div className={styles.logo} />
        <Menu theme="dark" mode="inline">
          {_map(sideBarMenu, (item, key) => {
            return (
              !!item.subItems && (
                <SubMenu
                  key={key}
                  title={
                    <span>
                      <Icon type={item.icon} />
                      <span>{item.name}</span>
                    </span>
                  }
                >
                  {_map(item.subItems, (subItem, subKey) => {
                    return (
                      <Menu.Item key={subKey} className={styles.menuItem}>
                        <Link to={subItem.path}>
                          <Icon type={subItem.icon} />
                          <span>{subItem.name}</span>
                        </Link>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              )
            );
          })}
        </Menu>
      </Sider>
    );
  };

  return (
    <AntLayout>
      {renderSideBar()}
      <AntLayout>
        <Header className={styles.header}>
          <Icon
            className={styles.trigger}
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={() => setCollapsed(!collapsed)}
          />
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            className={styles.menu}
          >
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1" onClick={() => changeLanguage("en")}>
                    {translate("messages.english")}
                  </Menu.Item>
                  <Menu.Item key="2" onClick={() => changeLanguage("pt")}>
                    {translate("messages.portuguese")}
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <a
                className={`${styles.antDropdownLink} ant-dropdown-link`}
                href="#"
              >
                <Icon type="global" /> <Icon type="down" />
              </a>
            </Dropdown>
          </Menu>
        </Header>
        {children}
        <Footer className={styles.footer}>
          {translate("messages.createdBy")} Fuzaroth ©2019
        </Footer>
      </AntLayout>
    </AntLayout>
  );
};

const Loader = () => (
  <div className={styles.loader}>
    <Icon className={styles.loaderIcon} type="loading" />
  </div>
);

const Layout = ({ children }) => (
  <Suspense fallback={<Loader />}>
    <Page>{children}</Page>
  </Suspense>
);

export default Layout;
