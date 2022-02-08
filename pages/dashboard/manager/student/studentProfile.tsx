import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { ColumnType } from "antd/lib/table";
import TextLink from "antd/lib/typography/Link";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
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
export default function Dashboard() {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounceSearch(setQuery);
  const [isModalDisplay, setModalDisplay] = useState(false);
  const base = "http://cms.chtoma.com/api";
  const [editingStudent, setEditingStudent] = useState<Student>(null);
  const userToken = JSON.parse(localStorage.getItem("cms")).data.token;
  let data;
/*
  const { data, loading, paginator, setPaginator, total, setTotal, setData } = useListEffect<
    StudentsRequest,
    StudentsResponse,
    Student
  >(apiService.getStudents.bind(apiService), 'students', true, { query });
*/

    axios
      .get<Promise<IResponse<StudentsResponse>>>(
        `http://cms.chtoma.com/api/students?limit=20&page=1`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(async function (response) {
        data = JSON.stringify((await response.data).data.students);
        console.log(data);
      });


  const columns: ColumnType<Student>[] = [
    {
      title: "No.",
      key: "index",
      render: (_1, _2, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      sortDirections: ["ascend", "descend"],
      sorter: (pre: Student, next: Student) => {
        const preCode = pre.name.charCodeAt(0);
        const nextCode = next.name.charCodeAt(0);

        return preCode > nextCode ? 1 : preCode === nextCode ? 0 : -1;
      },
      render: (_, record: Student) => (
        <Link href={`/dashboard/manager/students/${record.id}`}>
          {record.name}
        </Link>
      ),
    },
    {
      title: "Area",
      dataIndex: "country",
      width: "10%",
      filters: businessAreas.map((item) => ({ text: item, value: item })),
      onFilter: (value: string, record: Student) =>
        record.country.includes(value),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Selected Curriculum",
      dataIndex: "courses",
      width: "25%",
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
      dataIndex: "ctime",
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
      <Table
        dataSource={data} columns={columns}
      ></Table>
    </>
  );
}
