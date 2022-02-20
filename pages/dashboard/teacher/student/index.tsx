import { Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import TextLink from "antd/lib/typography/Link";
import Link from "next/link";
import React, { useState } from "react";
import TeacherLayout from "../../teacherDashboard";
import { useListEffect } from "../../../../lib/custom-hooks/listEffect";
import storage from "../../../../lib/services/storage";
import {
  Student,
  StudentsRequest,
  StudentsResponse,
} from "../../../../lib/model/student";
import { CourseShort } from "../../../../lib/model/course";
import apiService from "../../../../lib/services/apiService";
import { genCommonTableProps } from "../../../../lib/util/tableHelper";

export default function Page() {
  const [query] = useState<string>("");
  const { data, loading, paginator, setPaginator, total } = useListEffect<
    StudentsRequest,
    StudentsResponse,
    Student
  >(apiService.getStudents.bind(apiService), "students", true, { query });
  const columns: ColumnsType<Student> = [
    { title: "No.", key: "index", render: (_1, _2, index) => index + 1 },
    { title: "name", dataIndex: "name" },
    { title: "country", dataIndex: "country" },
    { title: "email", dataIndex: "email" },
    {
      title: "course",
      dataIndex: "courses",
      render: (ary: CourseShort[]) => (
        <>
          {ary.map((item) => (
            <Space key={item.id}>
              <Link
                href={`/dashboard/${storage.role}/courses/${item.courseId}`}
              >
                {item.name}
              </Link>
            </Space>
          ))}
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_) => (
        <Space size="middle">
          <TextLink>Notify</TextLink>
        </Space>
      ),
    },
  ];

  return (
    <TeacherLayout>
      <Table
        {...genCommonTableProps({
          data,
          paginator,
          loading,
          setPaginator,
          columns,
          total,
        })}
      ></Table>
    </TeacherLayout>
  );
}
