import { useState } from 'react';

const API = "http://localhost:3001/toys";

function ToyForm({ addToy }) {
  const [formData, setFormData] = useState({
    name: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newToy = {
      ...formData,
      likes: 0
    };

    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    })
      .then(res => res.json())
      .then(createdToy => {
        addToy(createdToy);
        setFormData({ name: "", image: "" });
      })
      .catch(err => console.error("Error creating toy:", err));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <br />
        <input type="submit" value="Create New Toy" className="submit" />
      </form>
    </div>
  );
}

export default ToyForm;