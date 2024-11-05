// menuTypes.ts

export type Ingredient = {
  name: string;
};

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  ingredients: Ingredient[];
};

export type AddMenuItemPayload = {
  category: string;
  item: MenuItem;
};

export interface AddCategoryPayload {
  category: {
    name: string;
    description: string;
  };
}
  
// Represents a standard success response from the server
export interface SuccessResponse {
  message: string;
}
export interface MenuItemDetails {
  itemName: string;
  description: string;
  price: number;
}

export interface Category {
  name: string;
  description: string;
}