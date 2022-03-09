import { Breadcrumb } from "antd";
import React from "react";
import ManagerLayout from "../managerDashboard";

export default function Overview() {
  return (
    <ManagerLayout>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>CMS Manager System</Breadcrumb.Item>
        <Breadcrumb.Item>Overview</Breadcrumb.Item>
      </Breadcrumb>
    </ManagerLayout>
  );
}
