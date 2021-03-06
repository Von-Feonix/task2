import { Button, Form, Input, Select } from "antd";
import React from "react";
import styled from "styled-components";
import { businessAreas } from "../constant/role";
import { validateMessages } from "../constant/config";
import { AddStudentRequest, AddStudentResponse, Student } from "../model/student";
import apiService from "../services/apiService";
import storage from "../services/storage";
import axios from "axios";
import { IResponse, QueryParams } from "../model/api";
import { json } from "node:stream/consumers";

const ModalFormSubmit = styled(Form.Item)`
  position: absolute;
  bottom: 0;
  right: 8em;
  margin-bottom: 10px;
`;

export type AddStudentFormValues = AddStudentRequest;
export interface AddStudentFormProps {
  onFinish?: (value: Student) => void;
  student?: Student;
}

export default function AddStudentForm(
  props: AddStudentFormProps
): JSX.Element {
  const [form] = Form.useForm();
  const { onFinish, student } = props;
  const userToken = storage.token;
  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ offset: 1 }}
      form={form}
      validateMessages={validateMessages}
      onFinish={(values: AddStudentFormValues) => {
        console.log(userToken);
        console.log(values);
        const response = !student
          ? apiService.addStudent(values)
          /*axios.post<Promise<IResponse<AddStudentResponse>>>("http://cms.chtoma.com/api/students",
          {
            headers:{
              Authorization: `Bearer ${userToken}`,
            },
            data:JSON.stringify(values)
          }
          )*/
          : apiService.updateStudent({ ...values, id: student.id });
        response.then((response) => {
          const { data } = response;

          if (onFinish && data) {
            onFinish(data);
          }
        });
      }}
      initialValues={{
        name: student?.name,
        email: student?.email,
        country: student?.country,
        typeId: student?.type.id,
      }}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input type="text" placeholder="student name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ type: "email" }, { required: true }]}
      >
        <Input type="email" placeholder="email" />
      </Form.Item>

      <Form.Item label="Area" name="country" rules={[{ required: true }]}>
        <Select>
          {businessAreas.map((item, index) => (
            <Select.Option value={item} key={index}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Student Type" name="type" rules={[{ required: true }]}>
        <Select>
          <Select.Option value={1}>Tester</Select.Option>
          <Select.Option value={2}>Developer</Select.Option>
        </Select>
      </Form.Item>

      <ModalFormSubmit shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
          >
            {!!student ? "Update" : "Add"}
          </Button>
        )}
      </ModalFormSubmit>
    </Form>
  );
}
