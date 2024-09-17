import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  CarOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import PredictInform from "./CarPredicFormMal/PredictInform";

const { Header, Sider, Content } = Layout;

const contentMap = {
  1: {
    header: "Prediction Type",
    component: <PredictInform />,
  },
  2: {
    header: "Header for nav 2",
    component: "",
  },
  3: {
    header: "Header for nav 3",
    component: " <Nav3Content />",
  },
};

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState("1"); // Default to "1"

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: "sticky",
          height: "100vh",
          left: 0,
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="demo-logo-vertical">
          <img
            src="https://ebsedu.org/wp-content/uploads/elementor/thumbs/AI-Artificial-Intelligence-What-it-is-and-why-it-matters-qb1o8gpaeu2d4z5h27m45d99w1tmlkjwinh4wq1izi.jpg"
            alt="Logo"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={handleMenuClick} // Handle menu item clicks
        >
          <Menu.Item key="1" icon={<CarOutlined />}>
            Prediction Type
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <span style={{ fontSize: "16px", fontWeight: "bold", color: "gray" }}>
            {contentMap[selectedKey].header}
          </span>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {contentMap[selectedKey].component}
        </Content>
      </Layout>
    </Layout>
  );
}
