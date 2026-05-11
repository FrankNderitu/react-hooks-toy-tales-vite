const API = "http://localhost:3001/toys";

function ToyCard({ toy, donateToy, likeToy }) {

  const handleLike = () => {
    const updatedLikes = toy.likes + 1;

    fetch(`${API}/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ likes: updatedLikes })
    })
      .then(res => res.json())
      .then(updatedToy => {
        likeToy(updatedToy);
      })
      .catch(err => console.error("Error liking toy:", err));
  };

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img 
        src={toy.image} 
        alt={toy.name} 
        className="toy-avatar" 
      />
      <p>{toy.likes} Likes</p>
      
      <button className="like-btn" onClick={handleLike}>
        Like ❤️
      </button>
      
      <button 
        onClick={() => donateToy(toy.id)} 
        className="del-btn"
      >
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;