import React, { useState } from "react";
import "antd/dist/antd.css";
import { Affix, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import UserIcon from "../../lib/layout/userIcon";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import withRouter, { WithRouterProps } from "next/dist/client/with-router";

const { Header, Content, Sider } = Layout;
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

interface Props extends WithRouterProps {
  router: Router;
}

/* const MenuContainer = styled(Menu)`
  height: 100%;
  margin-top: -0.1px;
  padding-top: 0.1px
`; */

const TeacherDashboardLayout = (props: React.PropsWithChildren<Props>) => {
  
  let state = {
    collapsed: false,
  };

  const [collapsed, toggleCollapsed] = useState(false);
  const toggle = () => {
    toggleCollapsed(!collapsed);
  };
  const router = useRouter();
  const [currentMenuItem, setCurrentMenuItem] = useState("/manager");
  const handleClick = (e: any) => {
    console.log("click ", e);
    setCurrentMenuItem(e.key);
  };

  const pathname = props.router.pathname;
  const pathsplit: string[] = pathname.split("/");
  const selectedKeys = pathsplit.pop();

  return (
    <Affix>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(isCollapsed) => toggleCollapsed(isCollapsed)}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            onClick={handleClick}
            selectedKeys={[selectedKeys]}
          defaultOpenKeys={[selectedKeys + "s"]}
          >
            <Menu.Item key="homepage" icon={<PieChartOutlined />}>
              <Link href="/dashboard/teacher/homepage">Overview</Link>
            </Menu.Item>
            <SubMenu key="students" icon={<UserOutlined />} title="Student">
              <Menu.Item key="student">
                <Link href="/dashboard/teacher/student/">Student File</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Course">
              <Menu.Item key="5">Team 1</Menu.Item>
              <Menu.Item key="6">Team 2</Menu.Item>
            </SubMenu>
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

          <StyledContent className="site-layout-background">
            {props.children}
          </StyledContent>
        </Layout>
      </Layout>
    </Affix>
  );
}
export default withRouter(TeacherDashboardLayout);
