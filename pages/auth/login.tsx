import { LoginForm } from "@/forms/login-form";
import { AuthLayout } from "@/epic/layouts/auth-layout";

export default function Login() {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  );
}
