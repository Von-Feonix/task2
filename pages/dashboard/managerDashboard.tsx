import React, { Children, useState } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import UserIcon from "../../lib/layout/userIcon";
import { useRouter } from "next/router";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const LayoutHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  color: white;
`;
const StyledContent = styled(Content)`
  margin: 16px;
  background-color: #fff;
  padding: 16px;
  min-height: auto;
`;

/* const MenuContainer = styled(Menu)`
  height: 100%;
  margin-top: -0.1px;
  padding-top: 0.1px
`; */

export default function DashLayout() {
  let state = {
    collapsed: false,
  };

  const [collapsed, toggleCollapsed] = useState(false);
  const toggle = () => {
    toggleCollapsed(!collapsed);

  };
  const router = useRouter();
  const onclickStudentfile = () => {
    router.push('manager/student/studentProfile');
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(isCollapsed) => toggleCollapsed(isCollapsed)}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Overview
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Student">
            <Menu.Item key="2" onClick={onclickStudentfile}>Student File</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Course">
            <Menu.Item key="5">Team 1</Menu.Item>
            <Menu.Item key="6">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="7" icon={<FileOutlined />}>
            Teacher
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <LayoutHeader className="site-layout-header">
          {React.createElement(
            state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <UserIcon />
        </LayoutHeader>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>System</Breadcrumb.Item>
          <Breadcrumb.Item>Overview</Breadcrumb.Item>
        </Breadcrumb>
        <StyledContent className="site-layout-background">
          context
        </StyledContent>
      </Layout>
    </Layout>
  );
}
