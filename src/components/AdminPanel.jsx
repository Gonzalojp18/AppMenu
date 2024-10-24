import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dishes');
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/dishes', newDish);
      setNewDish({ name: '', description: '', price: '', imageUrl: '' });
      fetchDishes();
    } catch (error) {
      console.error('Error adding dish:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/dishes/${id}`);
      fetchDishes();
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  const handleUpdatePrice = async (id, newPrice) => {
    try {
      await axios.put(`http://localhost:5000/api/dishes/${id}`, { price: newPrice });
      fetchDishes();
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>
      <form onSubmit={handleSubmit} className="add-dish-form">
        <h2>Agregar Nuevo Plato</h2>
        <input
          type="text"
          placeholder="Nombre del plato"
          value={newDish.name}
          onChange={(e) => setNewDish({...newDish, name: e.target.value})}
          required
        />
        <textarea
          placeholder="Descripción"
          value={newDish.description}
          onChange={(e) => setNewDish({...newDish, description: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={newDish.price}
          onChange={(e) => setNewDish({...newDish, price: e.target.value})}
          required
        />
        <input
          type="url"
          placeholder="URL de la imagen"
          value={newDish.imageUrl}
          onChange={(e) => setNewDish({...newDish, imageUrl: e.target.value})}
          required
        />
        <button type="submit">Agregar Plato</button>
      </form>

      <div className="dishes-list">
        <h2>Platos Existentes</h2>
        {dishes.map((dish) => (
          <div key={dish._id} className="dish-item">
            <img src={dish.imageUrl} alt={dish.name} className="admin-dish-image" />
            <div className="dish-details">
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <div className="price-control">
                <input
                  type="number"
                  value={dish.price}
                  onChange={(e) => handleUpdatePrice(dish._id, e.target.value)}
                />
              </div>
              <button onClick={() => handleDelete(dish._id)} className="delete-btn">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;