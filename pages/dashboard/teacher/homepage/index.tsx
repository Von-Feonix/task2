import { Breadcrumb } from "antd";
import React from "react";
import TeacherLayout from "../../teacherDashboard";

export default function Overview() {
  return (
    <TeacherLayout>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>CMS Teacher System</Breadcrumb.Item>
        <Breadcrumb.Item>Overview</Breadcrumb.Item>
      </Breadcrumb>
    </TeacherLayout>
  );
}
