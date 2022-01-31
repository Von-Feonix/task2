import { Form, Input, Button, Checkbox, Radio, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import { Role } from "../lib/constant/role";
import { LoginFormValues } from "../lib/model/login";
import { useRouter } from "next/router";

function Login() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const router = useRouter();
  const login = async (loginRequest: LoginFormValues) => {
    
    console.log(loginRequest);
    router.push("dashboard");
    
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
              name="username"
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
              No account? &nbsp;&nbsp; <a href="login.tsx">Sign up</a>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Login;
