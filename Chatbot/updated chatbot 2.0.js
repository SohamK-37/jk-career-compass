// backend/index.js

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample DB (you can replace with real DB)
const collegesInfo = [
  {
    name: "IIT Bombay",
    city: "Mumbai",
    state: "Maharashtra",
    rating: 4.9,
    courses: ["Computer Science", "Electrical Engineering", "Mechanical Engineering"],
    fees: { "BTech CS": "₹8‑10 lakh approx" },
    duration: { "BTech CS": "4 years" }
  },
  {
    name: "IIT Delhi",
    city: "New Delhi",
    state: "Delhi",
    rating: 4.8,
    courses: ["Computer Science", "Data Science", "Electronics"],
    fees: { "BTech CS": "₹8‑10 lakh approx" },
    duration: { "BTech CS": "4 years" }
  },
  // ... aur 8 colleges
];

// Endpoint to get colleges by city/state + interest
app.post('/api/colleges', (req, res) => {
  const { interest, city, state } = req.body;

  // Filter colleges offering the interest field
  let filtered = collegesInfo.filter(col => 
    col.courses.some(c => c.toLowerCase().includes(interest.toLowerCase()))
  );

  if (city) {
    filtered = filtered.filter(col => col.city.toLowerCase() === city.toLowerCase());
  } else if (state) {
    filtered = filtered.filter(col => col.state.toLowerCase() === state.toLowerCase());
  }

  // Limit to top 10
  filtered = filtered.slice(0, 10);

  // Return structured data
  const response = filtered.map(col => ({
    name: col.name,
    city: col.city,
    state: col.state,
    rating: col.rating,
    fees: col.fees[`BTech ${interest}`] || "Fee info not available",
    duration: col.duration[`BTech ${interest}`] || "Duration info not available"
  }));

  res.json({ colleges: response });
});

// Start server
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
