import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dishes');
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
      setErrorMessage('Error fetching dishes');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dishToAdd = { ...newDish, price: parseFloat(newDish.price) };
      await axios.post('http://localhost:5000/api/dishes', dishToAdd);
      setNewDish({ name: '', description: '', price: '' });
      setErrorMessage('');
      fetchDishes();
    } catch (error) {
      console.error('Error adding dish:', error);
      setErrorMessage('Error adding dish, please try again');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/dishes/${id}`);
      fetchDishes();
    } catch (error) {
      console.error('Error deleting dish:', error);
      setErrorMessage('Error deleting dish');
    }
  };

  const handleUpdatePrice = async (id, newPrice) => {
    try {
      await axios.put(`http://localhost:5000/api/dishes/${id}`, { price: parseFloat(newPrice) });
      fetchDishes();
    } catch (error) {
      console.error('Error updating price:', error);
      setErrorMessage('Error updating price');
    }
  };

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>
      
      {errorMessage && <p className="error">{errorMessage}</p>}
      
      <form onSubmit={handleSubmit} className="add-dish-form">
        <h2 className='mb-5'>Agregar Nuevo Plato</h2>
        <input
          type="text"
          placeholder="Nombre del plato"
          value={newDish.name}
          onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Descripción"
          value={newDish.description}
          onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={newDish.price}
          onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
          required
        />
        <button type="submit">Agregar Plato</button>
      </form>

      <div className="dishes-list">
        {dishes.length > 0 ? (
          dishes.map((dish) => (
            <div key={dish.id} className="dish-item">
              <div className="dish-details">
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
                <div className="price-control">
                  <input
                    type="number"
                    value={dish.price}
                    onChange={(e) => handleUpdatePrice(dish.id, e.target.value)}
                  />
                </div>
                <button onClick={() => handleDelete(dish.id)} className="delete-btn">
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay platos disponibles</p>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
