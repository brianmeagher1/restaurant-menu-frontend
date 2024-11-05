// src/services/menuService.ts

import { AddMenuItemPayload, SuccessResponse, MenuItem, MenuItemDetails } from "../data/menuTypes";

/**
 * Adds a new menu item by sending a POST request to the API.
 * @param newMenuItem - The menu item payload to add.
 * @returns A promise that resolves to a success response.
 */
export async function addMenuItem(newMenuItem: AddMenuItemPayload): Promise<String> {
  try {
    console.log("Calling API to add menu item with payload:", newMenuItem);

    const response = await fetch("http://localhost:7200/api/menuitem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuItem),
    });

    /*if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }*/

    // Directly parse the response as text since we expect a plain text response
    const data = await response.text();
    console.log("API response data:", data);
    return data; // Return plain text response
  } catch (error) {
    console.error("Error adding menu item:", error);
    throw error;
  }
}

/**
 * Fetches all menu items for a specific category from the API.
 * @param category - The category for which to fetch items.
 * @returns A promise that resolves to an array of MenuItem objects.
 */
export async function getItemsByCategory(category: string): Promise<MenuItemDetails[]> {
  try {
    console.log(`Calling API to fetch items for category: ${category}`);
    const response = await fetch(`http://localhost:7200/api/menu/${category}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`API response data for ${category}:`, data);
    return data as MenuItemDetails[];
  } catch (error) {
    console.error(`Error fetching items by category ${category}:`, error);
    throw error;
  }
}