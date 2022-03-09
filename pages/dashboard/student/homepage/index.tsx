import { Breadcrumb } from "antd";
import React from "react";
import StudentLayout from "../../studentDashboard";

export default function Overview() {
  return (
    <StudentLayout>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>CMS Student System</Breadcrumb.Item>
        <Breadcrumb.Item>Overview</Breadcrumb.Item>
      </Breadcrumb>
    </StudentLayout>
  );
}
