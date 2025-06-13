import React, { useState } from "react";
import axios from "axios";

const Recommend = () => {
  const [bmi, setBmi] = useState("");
  const [budget, setBudget] = useState("");
  const [favorites, setFavorites] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        bmi: parseFloat(bmi),
        budget: parseFloat(budget),
        favorites: favorites.split(",").map(item => item.trim()),
      };

      const response = await axios.post("http://127.0.0.1:5000/recommend", payload);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Failed to get recommendations. Please try again.");
    }
  };

  return (
    <div className="recommend-container">
      <h2>🥦 Grocery Recommendations</h2>
      <form onSubmit={handleSubmit}>
        <label>
          BMI:
          <input
            type="number"
            value={bmi}
            onChange={(e) => setBmi(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Budget:
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Favorite Items (comma separated):
          <input
            type="text"
            value={favorites}
            onChange={(e) => setFavorites(e.target.value)}
            placeholder="e.g., Apple, Oats, Carrot"
          />
        </label>
        <br />

        <button type="submit">Get Recommendations</button>
      </form>

      {results.length > 0 && (
        <div className="results">
          <h3>Top Suggestions</h3>
          <ul>
            {results.map((item, index) => (
              <li key={index}>
                <strong>{item.item}</strong> – {item.calories} kcal – ₹{item.price} ({item.category})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Recommend;
