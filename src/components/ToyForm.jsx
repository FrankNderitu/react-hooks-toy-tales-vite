import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name: name,
      image: image,
      likes: 0,
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((toy) => onAddToy(toy));

    setName("");
    setImage("");
  }

  return (
    <div className="new-toy-form">
      <h2>Add a Toy</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          type="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;