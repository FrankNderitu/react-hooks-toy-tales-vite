import React, { useEffect, useState } from "react";
import ToyContainer from "./ToyContainer";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);

  // GET request
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  // ADD TOY
  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  }

  // DELETE TOY
  function handleDeleteToy(id) {
    const updatedToys = toys.filter((toy) => toy.id !== id);
    setToys(updatedToys);
  }

  // LIKE TOY
  function handleUpdateToy(updatedToy) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );

    setToys(updatedToys);
  }

  return (
    <div className="app">
      <ToyForm onAddToy={handleAddToy} />
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </div>
  );
}

export default App;