// src/components/AddCategoryForm.tsx

import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { addCategory } from "../services/categoryService.ts";
import { AddCategoryPayload, SuccessResponse } from "../data/menuTypes.ts";

const AddCategoryForm: React.FC = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handler for form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Log that the form was submitted
    console.log("Form submitted with:", { categoryName, description });

    // Validate input fields
    if (!categoryName || !description) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    // Prepare the payload for the API call
    const payload: AddCategoryPayload = {
      category: {
        name: categoryName,
        description: description,
      },
    };

    // Log that the API call is about to start
    console.log("Calling API to add category with payload:", payload);

    try {
      const response = await addCategory(payload);
      
      // Log the API response
      console.log("API response received:", response);

      // Handle success response
      setSuccessMessage(`Category '${payload.category.name}' added successfully!`);
      setCategoryName("");
      setDescription("");
      setErrorMessage(null);
    } catch (error) {
      // Log the error
      console.error("Error adding category:", error);
      setErrorMessage("Failed to add category. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <TextField
        label="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Category
      </Button>
    </Box>
  );
};

export default AddCategoryForm;