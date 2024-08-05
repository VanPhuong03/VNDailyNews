// SearchPage.js
import React, { useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "@components/SearchContext";
import API_ENDPOINTS from "../../config/api";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useSearch();
  const searchValue = query.get("query");
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    setSearchTerm(searchValue || ""); // Đặt giá trị tìm kiếm từ URL vào Context

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.NEWS}/by-search?limit=10&page=1&searchValue=${searchValue}`
        );
        const data = response.data;

        if (data && Array.isArray(data.newsList)) {
          setResults(data.newsList);
        } else {
          setResults([]);
          console.error("Unexpected response format: ", data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchValue, setSearchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container content">
      <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
        <input
          className="form-control"
          placeholder="Tìm kiếm..."
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Tìm kiếm
        </button>
      </form>
      <h1>Kết quả tìm kiếm cho "{searchValue}"</h1>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <Link to={`/newsdetail/${result.id}`}>
              <img src={result.anhdaidien} alt={result.tieude} />
              <h2>{result.tieude}</h2>
              <p>{result.noidungtomtat}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
