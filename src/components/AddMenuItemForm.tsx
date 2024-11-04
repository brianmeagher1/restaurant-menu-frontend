// src/components/AddMenuItemForm.tsx

import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box, Alert } from "@mui/material";
import { AddMenuItemPayload, Ingredient } from "../data/menuTypes.ts";
import { addMenuItem } from "../services/menuService.ts";

const AddMenuItemForm: React.FC = () => {
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const payload: AddMenuItemPayload = {
      category,
      item: {
        name: itemName,
        description,
        price: price || 0,
        ingredients: ingredients.map((ingredient) => ({ name: ingredient })),
      },
    };

    try {
      console.log("Submitting menu item with payload:", payload);
      const response = await addMenuItem(payload);
      setSuccessMessage(response.message);
      console.log("Menu item added successfully:", response.message);
    } catch (error) {
      setErrorMessage("Failed to add menu item. Please try again.");
      console.error("Error adding menu item:", error);
    }
  };

  return (
    <div>
      <h2>Add New Menu Item</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Category Name:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </label>
        <label>
          Item Name:
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
        </label>
        <label>
          Ingredients:
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                required
              />
              {index === ingredients.length - 1 && (
                <button type="button" onClick={handleAddIngredient}>
                  Add Ingredient
                </button>
              )}
            </div>
          ))}
        </label>
        <button type="submit">Add Menu Item</button>
      </form>
    </div>
  );
};

export default AddMenuItemForm;
