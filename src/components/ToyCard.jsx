const API = "http://localhost:3001/toys";

function ToyCard({ toy, donateToy, likeToy }) {
  const handleLike = () => {
    fetch(`${API}/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 })
    })
      .then(res => res.json())
      .then(updatedToy => likeToy(updatedToy));
  };

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes</p>
      
      <button className="like-btn" onClick={handleLike}>
        Like ❤️
      </button>
      
      <button className="del-btn" onClick={() => donateToy(toy.id)}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;