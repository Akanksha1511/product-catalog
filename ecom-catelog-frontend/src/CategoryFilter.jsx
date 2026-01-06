import React from "react";



const CategoryFilter = ({ categories=[], onSelect }) => {
  return (
    <>
      <select
        id="categorySelect"
        className="form-control"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">All Category</option>

        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default CategoryFilter;
