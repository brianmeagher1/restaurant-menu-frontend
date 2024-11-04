import React, { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService.ts";
import { getItemsByCategory } from "../services/menuService.ts"; // Add this line
import { Category, MenuItemDetails } from "../data/menuTypes.ts";
import CategoryItems from "./CategoryItems.tsx"; // Adjust the path if needed


const ViewCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItemDetails[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching categories...");
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log("Calling API to fetch categories...");
      const categories = await getCategories();
      console.log("Fetched categories: ", categories);
      setCategories(categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleCategoryClick = async (categoryName: string) => {
    console.log(`Fetching items for category: ${categoryName}`);
    setSelectedCategory(categoryName);
    try {
      const categoryItems = await getItemsByCategory(categoryName);
      console.log(`Fetched items for category ${categoryName}: `, categoryItems);
      setItems(categoryItems);
    } catch (error) {
      console.error(`Failed to fetch items for category ${categoryName}:`, error);
    }
  };

  return (
    <div>
      <h2>View Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category.name} | {category.description}
            <button onClick={() => handleCategoryClick(category.name)}>
              View {category.name}s
            </button>
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <div>
          <h3>Items in {selectedCategory}</h3>
          <CategoryItems items={items} />
        </div>
      )}
    </div>
  );
};

export default ViewCategories;
