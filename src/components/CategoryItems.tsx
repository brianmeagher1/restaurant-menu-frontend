import React, { useEffect, useState } from "react";
import { getItemsByCategory } from "../services/menuService.ts";
import { MenuItemDetails } from "../data/menuTypes.ts";

interface CategoryItemsProps {
    items: MenuItemDetails[];
  }
  
  const CategoryItems: React.FC<CategoryItemsProps> = ({ items }) => {
    return (
      <div>
        <ul>
          {items.length > 0 ? (
            items.map((item, index) => (
              <li key={index}>
                <strong>{item.item}</strong> - {item.description} - ${item.price.toFixed(2)}
              </li>
            ))
          ) : (
            <li>No items found in this category.</li>
          )}
        </ul>
      </div>
    );
  };
  
  export default CategoryItems;