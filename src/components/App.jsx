import { useState, useEffect } from 'react';
import ToyForm from './components/ToyForm';
import ToyContainer from './components/ToyContainer';

const API = "http://localhost:3001/toys";   // Change to 3000 if your json-server uses that port

function App() {
  const [toys, setToys] = useState([]);

  // GET - Fetch all toys on load
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setToys(data))
      .catch(err => console.error("Error fetching toys:", err));
  }, []);

  // POST - Add new toy
  const addToy = (newToy) => {
    setToys([...toys, newToy]);
  };

  // DELETE - Donate toy
  const donateToy = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setToys(toys.filter(toy => toy.id !== id));
      })
      .catch(err => console.error("Error deleting toy:", err));
  };

  // PATCH - Like a toy
  const likeToy = (updatedToy) => {
    setToys(toys.map(toy => 
      toy.id === updatedToy.id ? updatedToy : toy
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Toy Tales</h1>
      </header>
      
      <ToyForm addToy={addToy} />
      
      <ToyContainer 
        toys={toys} 
        donateToy={donateToy} 
        likeToy={likeToy} 
      />
    </div>
  );
}

export default App;