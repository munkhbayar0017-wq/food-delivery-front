import { LoginForm } from "@/components/login-form";
import { Order } from "./administrator/orders/Order";
import LoginPage from "./login/page";
import SignupPage from "./signup/page";
import { Administrator } from "./administrator/Administrator";
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
