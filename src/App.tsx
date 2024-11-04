// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddCategoryForm from './components/AddCategoryForm.tsx';
import AddMenuItemForm from './components/AddMenuItemForm.tsx';
import ViewCategories from './components/ViewCategories.tsx';
import CategoryItems from './components/CategoryItems.tsx';  // New import
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/add-category">Add Category</Link>
              </li>
              <li>
                <Link to="/add-menu-item">Add Menu Item</Link>
              </li>
              <li>
                <Link to="/view-categories">View Categories</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/add-category" element={<AddCategoryForm />} />
          <Route path="/add-menu-item" element={<AddMenuItemForm />} />
          <Route path="/view-categories" element={<ViewCategories />} />
          <Route path="/category-items/:category" element={<CategoryItems />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
