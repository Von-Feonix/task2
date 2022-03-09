<<<<<<< HEAD
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
=======
import React, { useState } from "react";
import "antd/dist/antd.css";
import { Breadcrumb, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
>>>>>>> d507b15c46014e12e7ef483d5a93b5ce291e2442
} from "@ant-design/icons";
import styled from "styled-components";
import UserIcon from "../../lib/layout/userIcon";
import { Router, withRouter } from "next/router";
import Link from "next/link";
import { WithRouterProps } from "next/dist/client/with-router";
<<<<<<< HEAD
import { routes, SideNav } from "../../lib/constant/routes";
import { generateKey, getActiveKey } from "../../lib/layout/sidenav";
import { useUserRole } from "../../lib/loginState";

const { Header, Content, Sider } = Layout;
=======

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
>>>>>>> d507b15c46014e12e7ef483d5a93b5ce291e2442

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

<<<<<<< HEAD
const getMenuConfig = (
  data: SideNav[]
): { defaultSelectedKeys: string[]; defaultOpenKeys: string[] } => {
  const key = getActiveKey(data);
  const defaultSelectedKeys = [key.split('/').pop()];
  const defaultOpenKeys = key.split('/').slice(0, -1);

  return { defaultSelectedKeys, defaultOpenKeys };
};

function renderMenuItems(data: SideNav[], parent = ''): JSX.Element[] {
  const userRole = useUserRole();

  return data.map((item, index) => {
    const key = generateKey(item, index);

    if (item.subNav && !!item.subNav.length) {
      return (
        <Menu.SubMenu key={key} title={item.label} icon={item.icon}>
          {renderMenuItems(item.subNav, item.path.join('/'))}
        </Menu.SubMenu>
      );
    } else {
      return item.hide ? null : (
        <Menu.Item key={key} title={item.label} icon={item.icon}>
          {!!item.path.length || item.label.toLocaleLowerCase() === 'overview' ? (
            <Link
              href={['/dashboard', userRole, parent, ...item.path]
                .filter((item) => !!item)
                .join('/')}
              replace
            >
              {item.label}
            </Link>
          ) : (
            item.label
          )}
        </Menu.Item>
      );
    }
  });
}
=======
/* const MenuContainer = styled(Menu)`
  height: 100%;
  margin-top: -0.1px;
  padding-top: 0.1px
`; */
>>>>>>> d507b15c46014e12e7ef483d5a93b5ce291e2442

const ManagerDashboardLayout = (props: React.PropsWithChildren<Props>) => {
  let state = {
    collapsed: false,
  };
<<<<<<< HEAD
  console.log(props.router);
=======
  
>>>>>>> d507b15c46014e12e7ef483d5a93b5ce291e2442
  const [collapsed, toggleCollapsed] = useState(false);
  const toggle = () => {
    toggleCollapsed(!collapsed);
  };
<<<<<<< HEAD
  const userRole = useUserRole();
  const sideNave = routes.get(userRole);
  const menuItems = renderMenuItems(sideNave);
  const { defaultOpenKeys, defaultSelectedKeys } = getMenuConfig(sideNave);
=======
>>>>>>> d507b15c46014e12e7ef483d5a93b5ce291e2442

  const pathname = props.router.pathname;
  const pathsplit: string[] = pathname.split("/");
  const selectedKeys = pathsplit.pop();
  return (
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
<<<<<<< HEAD
          defaultOpenKeys={defaultOpenKeys}
          defaultSelectedKeys={defaultSelectedKeys}
        >
          {menuItems}
=======
          selectedKeys={[selectedKeys]}
          defaultOpenKeys={[selectedKeys + "s"]}
        >
          <Menu.Item key="homepage" icon={<PieChartOutlined />}>
            <Link href="/dashboard/manager/homepage">Overview</Link>
          </Menu.Item>
          <SubMenu key="students" icon={<UserOutlined />} title="Student">
            <Menu.Item key="student">
              <Link href="/dashboard/manager/student/">Student File</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Course">
            <Menu.Item key="5">Team 1</Menu.Item>
            <Menu.Item key="6">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="7" icon={<FileOutlined />}>
            Teacher
          </Menu.Item>
>>>>>>> d507b15c46014e12e7ef483d5a93b5ce291e2442
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
  );
};
export default withRouter(ManagerDashboardLayout);
