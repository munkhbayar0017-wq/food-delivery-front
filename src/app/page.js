import { LoginForm } from "@/components/login-form";
import { Order } from "./Administrator/orders/Order";
import LoginPage from "./login/page";
import SignupPage from "./signup/page";
import { Administrator } from "./Administrator/Administrator";
import { Footer } from "./layout/Footer";

export default function Home() {
  return (
    <div>
      {/* <Footer /> */}
      {/* <Administrator /> */}
      {/* <Order /> */}
      {/* <SignupPage /> */}
      <LoginPage />
      {/* <LoginForm /> */}
    </div>
  );
}
