import { ToastContainer } from "react-toastify";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <Header />
      <Footer />
    </div>
  );
}
