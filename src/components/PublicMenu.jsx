import { useState, useEffect } from 'react';
import axios from 'axios';

function PublicMenu() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dishes');
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };
    fetchDishes();
  }, []);

  return (
    <div className="menu-container">
      <h1>Nuestro Menú</h1>
      <div className="dishes-grid">
        {dishes.map((dish) => (
          <div key={dish._id} className="dish-card">
            {/* <img src={dish.imageUrl} alt={dish.name} className="dish-image" /> */}
            <h2>{dish.name}</h2>
            <p>{dish.description}</p>
            <p className="price">${dish.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PublicMenu;