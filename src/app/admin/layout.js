import { FoodCategoryProvider } from "../_provider/FoodCategory";
import UserProvider from "../_provider/UserProvider";

export default function AdminPageLayout({ children }) {
  return (
    <UserProvider>
      <FoodCategoryProvider>{children}</FoodCategoryProvider>
    </UserProvider>
  );
}
