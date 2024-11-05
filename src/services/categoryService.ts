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

    /*if (!response.ok) {
      // Handle server error responses
      const errorText = await response.text();
      throw new Error(`Failed to add category: ${errorText}`);
    }*/

    // Attempt to parse the response as JSON first
    const contentType = response.headers.get("content-type");
    let responseData;

    if (contentType && contentType.includes("application/json")) {
      // If content-type is JSON, parse it as JSON
      responseData = await response.json();
    } else {
      // Otherwise, assume it's plain text
      responseData = await response.text();
      console.warn("Received plain text response instead of JSON:", responseData);
    }

    console.log("API response data (success):", responseData);

    return responseData as SuccessResponse;
  } catch (error) {
    // Log specific error details
    if (error instanceof SyntaxError) {
      console.error("Syntax error when parsing JSON response:", error.message);
    } else if (error instanceof TypeError) {
      console.error("Network error or resource unavailable:", error.message);
    } else {
      console.error("General error when adding category:", error.message);
    }
    throw error;
  }
}