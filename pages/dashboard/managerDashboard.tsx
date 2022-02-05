import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { withLatestFrom } from 'rxjs';
import UserIcon from '../../lib/layout/userIcon';

const { Header, Sider, Content } = Layout;



export default function managerDashboard(){
  let state = {
    collapsed: false
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [collapsed, toggleCollapse] = useState(false);
  const toggle = () =>{
    toggleCollapse(!collapsed)
  }
    return (
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={(isCollapsed) => toggleCollapse(isCollapsed)}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
              state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                color: 'white',
                className: "trigger",
                onClick: toggle
              } 
            )}
            <UserIcon/>
          </Header>
          <Content
            className="site-layout-background2"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }

