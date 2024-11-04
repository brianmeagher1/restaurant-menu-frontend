// src/services/categoryService.ts

import { AddCategoryPayload, SuccessResponse, Category } from "../data/menuTypes";

/**
 * Fetches all categories from the API.
 * @returns A promise that resolves to an array of Category objects.
 */
export async function getCategories(): Promise<Category[]> {
  try {
    console.log("Calling API to fetch categories...");
    const response = await fetch("http://localhost:7200/api/menu/");
    const data = await response.json();
    console.log("API response data:", data);

    // Transforming the response to match Category objects
    const categories = data.map((item: string) => {
      const [name, description] = item.split(" | ");
      return { name, description } as Category;
    });
    console.log("Transformed categories:", categories);

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

/**
 * Adds a new category via a POST request to the API.
 * @param newCategory - The payload containing category details to add.
 * @returns A promise that resolves to a success message.
 */
export async function addCategory(newCategory: AddCategoryPayload): Promise<SuccessResponse> {
  try {
    // Log the payload for debugging
    console.log("Calling API to add category with payload:", newCategory);

    // Make sure to stringify the payload
    const response = await fetch("http://localhost:7200/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory), // Convert the payload to a JSON string
    });

    if (!response.ok) {
      // Handle server error responses
      const errorText = await response.text();
      throw new Error(`Failed to add category: ${errorText}`);
    }

    const responseData = await response.json();
    console.log("API response received:", responseData);
    return responseData as SuccessResponse;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
}