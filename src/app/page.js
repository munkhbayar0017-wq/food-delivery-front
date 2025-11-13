import { Order } from "./Administrator/orders/Order";
import LoginPage from "./login/page";
import SignupPage from "./signup/page";

export default function Home() {
  return (
    <div>
      <Order />
      <SignupPage />
      <LoginPage />
    </div>
  );
}
