import PropTypes from "prop-types";

export const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card group hover:scale-105 transition-transform duration-200">
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="hover:opacity-90 transition-opacity duration-200"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-dark-100/80 px-2 py-1 rounded-md">
          <div className="rating">
            <img src="/star.svg" alt="star" className="w-4 h-4" />
            <p>{movie.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-2 hover:text-light-100 transition-colors duration-200">
          {movie.title}
        </h3>
        <div className="content justify-between">
          <span className="tag bg-dark-100/50 px-3 py-1 rounded-full text-sm">
            {new Date(movie.release_date).getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
  }).isRequired,
};
