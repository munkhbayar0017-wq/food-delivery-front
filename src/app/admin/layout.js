import { FoodCategoryProvider } from "../_provider/FoodCategory";

export default function AdminPageLayout({ children }) {
  return <FoodCategoryProvider>{children}</FoodCategoryProvider>;
}
