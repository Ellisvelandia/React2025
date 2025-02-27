import PropTypes from 'prop-types';

export const Search = ({ searchTerm, setSearchTerm }) => {
  return <div className="search">
    <div>
        <img src="/search.svg" alt="search" />
        <input
          type="text"
          placeholder=""
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
  </div>;
};

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired
};
