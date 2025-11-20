import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { Administrator } from "./administrator/Administrator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <Administrator />
      <Footer />
    </div>
  );
}
