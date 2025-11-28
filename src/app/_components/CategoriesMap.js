import Foods from "../admin/foodmenu/Foods";

export default function CategoriesMap({
  categories,
  foodCounts,
  setFoodCounts,
}) {
  const handleFoodsChange = (categoryId, count) => {
    setFoodCounts((prev) => ({
      ...prev,
      [categoryId]: count,
    }));
  };
  return (
    <div className="flex flex-col gap-6">
      {categories.map((category) => (
        <div
          key={category._id}
          className="flex flex-col w-full border rounded-xl p-6 gap-4 bg-[#FFFFFF]"
        >
          <div className="text-[#09090B] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
            {category.categoryName} ({foodCounts[category._id] || 0})
          </div>
          <Foods
            categoryId={category._id}
            categoryName={category.categoryName}
            categories={categories}
            onFoodsChange={(count) => handleFoodsChange(category._id, count)}
          />
        </div>
      ))}
    </div>
  );
}
