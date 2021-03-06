import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Popconfirm, Space, Table } from "antd";
import TextLink from "antd/lib/typography/Link";
import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import styled from "styled-components";
import ModalForm from "../../../../lib/common/modalForm";
import { useDebounceSearch } from "../../../../lib/custom-hooks/debounceSearch";
import { useListEffect } from "../../../../lib/custom-hooks/listEffect";
import {
  Student,
  StudentsRequest,
  StudentsResponse,
} from "../../../../lib/model/student";
import { BaseType } from "../../../../lib/model/api";
import { CourseShort } from "../../../../lib/model/course";
import apiService from "../../../../lib/services/apiService";
import { genCommonTableProps } from "../../../../lib/util/tableHelper";
import axios from "axios";
import ManagerLayout from "../../managerDashboard";
import AddStudentForm from "../../../../lib/layout/addStudentForm";
import storage from "../../../../lib/services/storage";
import Link from "next/link";
import { businessAreas } from "../../../../lib/constant/role";

const Search = styled(Input.Search)`
  width: 30%;
  display: block;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
export default function StudentProfile() {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounceSearch(setQuery);
  const [isModalDisplay, setModalDisplay] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student>(null);
  const userToken = storage.token;

  const { data, loading, paginator, setPaginator, total, setData } =
    useListEffect<StudentsRequest, StudentsResponse, Student>(
      apiService.getStudents.bind(apiService),
      "students",
      true,
      { query }
    );

  /*useEffect(() => {
    axios
      .get("http://cms.chtoma.com/api/students?page=1&limit=0", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(function (response) {
        const studentProfile = response.data.data.students;
        if (studentProfile) {
          console.log(studentProfile);
          setStudentProfile(studentProfile);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [userToken]);*/

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (_text: unknown, _record: unknown, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (pre: Student, next: Student) => {
        const preCode = pre.name.charCodeAt(0);
        const nextCode = next.name.charCodeAt(0);
        return preCode > nextCode ? 1 : preCode === nextCode ? 0 : -1;
      },
      render: (_, record: Student) => (
        <Link href={`/dashboard/manager/student/${record.id}`}>
          {record.name}
        </Link>
      ),
    },
    {
      title: "Area",
      dataIndex: "country",
      key: "area",
      filters: businessAreas.map((item) => ({ text: item, value: item })),
      onFilter: (value: string, record: Student) =>
        record.country.includes(value),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Selected Curriculum",
      dataIndex: "courses",
      key: "courses",
      render: (courses: CourseShort[]) =>
        courses?.map((item) => item.name).join(", "),
    },
    {
      title: "Student Type",
      dataIndex: "type",
      filters: [
        { text: "developer", value: "developer" },
        { text: "tester", value: "tester" },
      ],
      onFilter: (value: string, record: Student) => record.type.name === value,
      render: (type: BaseType) => type?.name,
    },
    {
      title: "Join Time",
      dataIndex: "createdAt",
      render: (value: string) =>
        formatDistanceToNow(new Date(value), { addSuffix: true }),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record: Student) => (
        <Space size="middle">
          <TextLink
            onClick={() => {
              setEditingStudent(record);
              setModalDisplay(true);
            }}
          >
            Edit
          </TextLink>

          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => {
              console.log(record.id);
              axios
                .delete(`http://cms.chtoma.com/api/students/${record.id}`, {
                  headers: { Authorization: `Bearer ${userToken}` },
                })
                .then(function (response) {
                  const { data: isDeleted } = response;
                  if (isDeleted) {
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
            okText="Confirm"
            cancelText="Cancel"
          >
            <TextLink>Delete</TextLink>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const cancel = () => {
    setModalDisplay(false);
    setEditingStudent(null);
  };
  return (
    <ManagerLayout>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link href="/dashboard/manager/homepage">System</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Student</Breadcrumb.Item>
      </Breadcrumb>

      <FlexContainer>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setModalDisplay(true);
            setEditingStudent(null);
          }}
        >
          Add
        </Button>
        <Search
          placeholder="Search by name"
          onSearch={(value) => setQuery(value)}
          onChange={debouncedQuery}
        />
      </FlexContainer>
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
      <ModalForm
        title={editingStudent ? "Edit Student" : "Add Student"}
        centered
        visible={isModalDisplay}
        cancel={cancel}
      >
        <AddStudentForm
          onFinish={(student: Student) => {
            if (editingStudent) {
              const index = data.findIndex((item) => item.id === student.id);
              data[index] = student;
              setData([...data]);
            }

            setModalDisplay(false);
          }}
          student={editingStudent}
        />
      </ModalForm>
    </ManagerLayout>
  );
}
