import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bmi: '',
    preferences: '',
    budget: ''
  });

  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/recommend', formData);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="App">
      <h1>🥦 NutriLife – Smart Grocery Planner</h1>

      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="number" step="0.1" name="bmi" placeholder="BMI" onChange={handleChange} required />
        <input type="text" name="preferences" placeholder="Favorite Items (comma separated)" onChange={handleChange} />
        <input type="number" name="budget" placeholder="Monthly Budget (₹)" onChange={handleChange} required />
        <button type="submit">Get Recommendations</button>
      </form>

      <div className="recommendations">
        <h2>Recommended Grocery Items</h2>
        {recommendations.length > 0 ? (
          <ul>
            {recommendations.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> – ₹{item.price} ({item.calories} cal)
              </li>
            ))}
          </ul>
        ) : (
          <p>No recommendations yet. Fill the form to get started.</p>
        )}
      </div>
    </div>
  );
}

export default App;
