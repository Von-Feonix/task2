import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { ColumnType } from "antd/lib/table";
import TextLink from "antd/lib/typography/Link";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalForm from "../../../../lib/common/modalForm";
import { useDebounceSearch } from "../../../../lib/custom-hooks/debounceSearch";
import { useListEffect } from "../../../../lib/custom-hooks/listEffect";
import { businessAreas } from "../../../../lib/constant/role";
import {
  Student,
  StudentsRequest,
  StudentsResponse,
} from "../../../../lib/model/student";
import { BaseType, IResponse } from "../../../../lib/model/api";
import { CourseShort } from "../../../../lib/model/course";
import apiService from "../../../../lib/services/apiService";
import { genCommonTableProps } from "../../../../lib/util/tableHelper";
import axios from "axios";
import { async } from "rxjs";

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
  const [studentProfile, setStudentProfile] = useState([]);
  const debouncedQuery = useDebounceSearch(setQuery);
  const [isModalDisplay, setModalDisplay] = useState(false);
  const base = "http://cms.chtoma.com/api";
  const [editingStudent, setEditingStudent] = useState<Student>(null);
  const userToken = JSON.parse(localStorage.getItem("cms")).data.token;
  let data;
  useEffect(() => {
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
  }, []);
  /*
  const { data, loading, paginator, setPaginator, total, setTotal, setData } = useListEffect<
    StudentsRequest,
    StudentsResponse,
    Student
  >(apiService.getStudents.bind(apiService), 'students', true, { query });
*/

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (_1, _2, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Area",
      dataIndex: "country",
      key: "area",
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
        courses?.map((item) => item.name).join(","),
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
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
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
      <Table dataSource={studentProfile} columns={columns}></Table>
    </>
  );
}
