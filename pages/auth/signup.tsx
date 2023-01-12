import { SignupForm } from "@/forms/signup-form";
import { AuthLayout } from "@/epic/layouts/auth-layout";

export default function Login() {
  return (
    <AuthLayout title="Sign up">
      <SignupForm />
    </AuthLayout>
  );
}
