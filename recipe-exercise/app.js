const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Recipe data
const recipes = [
    {
        name: "Classic Spaghetti",
        ingredients: ["Pasta", "Tomato Sauce", "Ground Beef", "Onions", "Garlic"]
    },
    {
        name: "Chicken Stir-Fry",
        ingredients: ["Chicken Breast", "Bell Peppers", "Soy Sauce", "Rice", "Carrots"]
    },
    {
        name: "Garden Salad",
        ingredients: ["Lettuce", "Tomatoes", "Cucumber", "Olive Oil", "Vinegar"]
    },
    {
        name: "Grilled Cheese",
        ingredients: ["Bread", "Cheddar Cheese", "Butter", "Salt", "Pepper"]
    },
    {
        name: "Fruit Smoothie",
        ingredients: ["Banana", "Strawberries", "Yogurt", "Honey", "Ice"]
    }
];

// Route to render recipes
app.get('/', (req, res) => {
    res.render('recipes', { recipes: recipes });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});