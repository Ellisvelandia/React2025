import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Card = ({ title, rating, actors }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`${title} has been liked ${hasLiked}`);
    return () => {
      console.log("Component unmounted");
    };
  }, [hasLiked, title]);

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden"
      onClick={() => setCount(count + 1)}
    >
      <img
        className="w-full h-56 object-cover object-center"
        src="https://images.unsplash.com/photo-1557683316-973673baf926"
        alt="avatar"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          {title} {count}
        </h2>
        <p className="text-gray-600">Rating: {rating}</p>
        <p className="text-gray-600">Actors: {actors.join(", ")}</p>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
        onClick={() => setHasLiked(!hasLiked)}
      >
        {hasLiked ? "❤️" : "🤍"} {hasLiked ? "Unlike" : "Like"}
      </button>
    </div>
  );
};
Card.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  actors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Card;
