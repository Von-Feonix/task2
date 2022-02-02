import { Form, Input, Button, Checkbox, Radio, Row, Col, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import { Role } from "../lib/constant/role";
import { LoginFormValues } from "../lib/model/login";
import { useRouter } from "next/router";
import Link from "next/link";
import CryptoJS from "crypto-js";

function Login() {
  const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");
  const iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412");

  function Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }

  const [form] = Form.useForm();
  const router = useRouter();
  let users = [];
  const login = async (loginRequest: LoginFormValues) => {
    console.log(loginRequest.email);
    var canLogin = false;

    for (var i = 1; i < localStorage.length + 1; i++) {
      let loginUser = JSON.parse(localStorage.getItem("" + i));
      if (loginRequest.email == loginUser.email) {
        if (loginRequest.password == Decrypt(loginUser.password)) {
          if (loginRequest.role == loginUser.role) {
            console.log(loginUser);
            canLogin = true;
            router.push(
              "dashboard/" +
                loginRequest.role +
                "Dashboard?email=" +
                loginRequest.email
            );
          }
        }
      }
    }
    if (!canLogin) {
      alert("Wrong password!");
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
