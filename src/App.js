import React, { useState } from "react";
import "./App.css";
import logo from "./logo.png";

function App() {
  const [mealInput, setMealInput] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const searchMeal = () => {
    setMeals([]);

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchedMeals = data.meals || [];
        setMeals(fetchedMeals);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const showMealDetails = (meal) => {
    setSelectedMeal(meal);
  };

  const closePopup = () => {
    setSelectedMeal(null);
  };
  return (
    <div className="App">
      {/* <h1>Meal Search</h1> */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
        <h1 className="logo-text">Meal Search</h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Meal Name"
          value={mealInput}
          onChange={(event) => setMealInput(event.target.value)}
        />
        <button onClick={searchMeal}>Search</button>
      </div>

      <div className="meal-container">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div
              className="meal-card"
              key={meal.idMeal}
              onClick={() => showMealDetails(meal)}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <div className="meal-details">
                <h3>{meal.strMeal}</h3>
                <p>Category: {meal.strCategory}</p>
                <p>Area: {meal.strArea}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-meals">No Meals Found</p>
        )}
      </div>
      {selectedMeal && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedMeal.strMeal}</h2>
            <p>Category: {selectedMeal.strCategory}</p>
            <p>Area: {selectedMeal.strArea}</p>
            <p>Instructions: {selectedMeal.strInstructions}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
