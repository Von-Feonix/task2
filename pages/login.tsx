import { Form, Input, Button, Checkbox, Radio, Row, Col, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import { Role } from "../lib/constant/role";
import { LoginFormValues } from "../lib/model/login";
import { useRouter } from "next/router";
import Link from "next/link";
import storage from "../lib/services/storage";
import apiService from "../lib/services/apiService";

function Login() {
  const router = useRouter();
  const login = async (loginRequest: LoginFormValues) => {
    const { data } = await apiService.login(loginRequest);

    if (!!data) {
      storage.setUserInfo(data);
      console.log(data);
      if (data.role === "manager") {
<<<<<<< HEAD
        router.push("/dashboard/manager");
=======
        router.push("/dashboard/manager/homepage");
>>>>>>> d507b15c46014e12e7ef483d5a93b5ce291e2442
      }
      if (data.role === "teacher") {
        router.push("/dashboard/teacher/homepage");
      }
      if (data.role === "student") {
        router.push("/dashboard/student/homepage");
      }
    }
  };
  return (
    <>
      <Header />
      <h1 className="login-title">Course Management Assistant</h1>
      <Row justify="center">
        <Col md={5} sm={24}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={(values: LoginFormValues) => login(values)}
          >
            <Form.Item name="role" initialValue={Role.student}>
              <Radio.Group>
                <Radio.Button value={Role.student}>Student</Radio.Button>
                <Radio.Button value={Role.teacher}>Teacher</Radio.Button>
                <Radio.Button value={Role.manager}>Manager</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true }, { type: "email" }]}
            >
              <Input
                className="username_input"
                prefix={<UserOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true }, { min: 4, max: 16 }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              <Space>
                <span>No account?</span>
                <Link href="/signup">Sign up</Link>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Login;
