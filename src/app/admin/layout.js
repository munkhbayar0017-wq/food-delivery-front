import AdminProvider from "../_provider/AdminProvider";
import { FoodCategoryProvider } from "../_provider/FoodCategory";
import UserProvider from "../_provider/UserProvider";

export default function AdminPageLayout({ children }) {
  return (
    <UserProvider>
      <AdminProvider>
        <FoodCategoryProvider>{children}</FoodCategoryProvider>
      </AdminProvider>
    </UserProvider>
  );
}
