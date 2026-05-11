import { useState, useEffect } from 'react';
import ToyForm from './ToyForm';
import ToyContainer from './ToyContainer';

const API = "http://localhost:3001/toys";

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setToys(data))
      .catch(err => console.error("Error fetching toys:", err));
  }, []);

  const addToy = (newToy) => {
    setToys(prev => [...prev, newToy]);
  };

  const donateToy = (id) => {
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then(() => {
        setToys(prev => prev.filter(toy => toy.id !== id));
      });
  };

  const likeToy = (updatedToy) => {
    setToys(prev => 
      prev.map(toy => toy.id === updatedToy.id ? updatedToy : toy)
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Toy Tales</h1>
      </header>
      
      <ToyForm addToy={addToy} />
      <ToyContainer toys={toys} donateToy={donateToy} likeToy={likeToy} />
    </div>
  );
}

export default App;