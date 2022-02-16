import { UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Radio, Row, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import Link from "next/link";
import { Header } from "antd/lib/layout/layout";
import { useRouter } from "next/router";
import React from "react";
import { Role } from "../lib/constant/role";
import { RegisterFormValues } from "../lib/model/login";
import CryptoJS from "crypto-js";

export default function Page() {
  const [form] = useForm();
  const router = useRouter();
  const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");
  const iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412");

  function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.ciphertext.toString().toUpperCase();
  }

  const signUp = async (values: RegisterFormValues) => {
    let existed = false;
    for (var i = 1; i < localStorage.length + 1; i++) {
      let registeredUser = JSON.parse(localStorage.getItem("" + i));

      console.log(registeredUser);

      if (values.email == registeredUser.email) {
        alert("existed email!");
        existed = true;
      }
    }
    if (!existed) {
      var newUser = {
        role: values.role,
        email: values.email,
        password: Encrypt(values.password),
      };
      let data = JSON.stringify(newUser);
      console.log(data);
      localStorage.setItem((localStorage.length + 1).toString(), data);

      console.log(localStorage);

      router.push("login");
    }
  };

  return (
    <>
      <Header />

      <h1 className="login-title">Sign up your account</h1>

      <Row justify="center">
        <Col md={8} sm={24}>
          <Form
            name="signUp"
            initialValues={{
              remember: true,
            }}
            onFinish={(values: RegisterFormValues) => signUp(values)}
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true }]}
              initialValue={Role.student}
            >
              <Radio.Group>
                <Radio value={Role.student}>Student</Radio>
                <Radio value={Role.teacher}>Teacher</Radio>
                <Radio value={Role.manager}>Manager</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="email"
              label="email"
              rules={[{ required: true }, { type: "email" }]}
            >
              <Input
                prefix={<UserOutlined />}
                type="email"
                placeholder="Please input email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }, { min: 4, max: 16 }]}
            >
              <Input.Password placeholder="please input password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Tap password again" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <Space>
            <span>Already have an account?</span>
            <Link href="/login">Sign in</Link>
          </Space>
        </Col>
      </Row>
    </>
  );
}
