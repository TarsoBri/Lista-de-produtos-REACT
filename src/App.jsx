import "./App.css";

import React from "react";

import { useState, useEffect } from "react";
// - costum hook
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // - costum hook para resgatar dado
  const { data: items, httpConfig, loading, error } = useFetch(url);

  // - add de produtos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };
    httpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  const handleDelete = (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/* - loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!error && (
        <ul className="products">
          {items &&
            items.map((product) => (
              <li key={product.id}>
                {product.name} - R${product.price}
                <button onClick={() => handleDelete(product.id)}>X</button>
              </li>
            ))}
        </ul>
      )}

      <div className="add-product">
        <h2>Publique seu produto aqui:</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <label>
            {loading && <input type="submit" disabled value="Aguarde" />}
            {!loading && <input type="submit" value="Criar produto" />}
          </label>
        </form>
      </div>
    </div>
  );
}

export default App;
