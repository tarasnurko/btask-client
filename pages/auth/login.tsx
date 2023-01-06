import { Row, Col, Typography } from "antd";

import { LoginForm } from "@/forms/login-form";
import { AuthLayout } from "@/epic/layouts/auth-layout";

const { Title } = Typography;

const layout = {
  xs: { span: 20, offset: 2 },
  lf: { span: 16, offset: 2 },
};

export default function Login() {
  return (
    <AuthLayout title="Btask | Login">
      <Col {...layout} style={{ paddingTop: "60px" }}>
        <Row>
          <Title>Login</Title>
        </Row>
        <Row>
          <LoginForm />
        </Row>
      </Col>
    </AuthLayout>
  );
}
