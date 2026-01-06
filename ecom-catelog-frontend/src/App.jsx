import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");


  // Load categories
  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Category Error:", err));
  }, []);

  // Load products (all or by category)
  useEffect(() => {
    let url = "http://localhost:8080/api/products";

    if (selectedCategory !== "") {
      url = `http://localhost:8080/api/products/category/${selectedCategory}`;
    }

    console.log("Fetching URL:", url);

    fetch(url)
      .then((res) => {
        console.log("Status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Product Error:", err));
  }, [selectedCategory]);

  

  // SEARCH + SORT LOGIC
const filteredProducts = products
  .filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    
  <div className="container mt-4">

    {/* TITLE */}
    <h2 className="text-center mb-4">Product Catalog</h2>

    {/* FILTER ROW */}
    {/* FILTER ROW */}
<div className="row mb-4">

  {/* CATEGORY */}
  <div className="col-md-4">
    <select
      className="form-control"
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  </div>

  {/* SEARCH */}
  <div className="col-md-4">
    <input
      type="text"
      className="form-control"
      placeholder="Search product"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  {/* SORT */}
  <div className="col-md-4">
    <select
      className="form-control"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="">Sort by Price</option>
      <option value="lowToHigh">Low to High</option>
      <option value="highToLow">High to Low</option>
    </select>
  </div>

</div>


    {/* PRODUCTS GRID */}
    <div className="row">
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
       filteredProducts.map((p) => (
          <div className="col-md-4 mb-4" key={p.id}>
            <div className="card h-100">
              <img
                src={p.imageUrl || "https://placehold.co/600x400"}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
                <strong>₹{p.price}</strong>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);


}

export default App;
