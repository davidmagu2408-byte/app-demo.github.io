import { IoSearch } from "react-icons/io5";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <>
      <div className="headerSearch ms-3">
        <form onSubmit={handleSubmit} className="headerSearchForm">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit">
            <IoSearch />
          </Button>
        </form>
      </div>
    </>
  );
};

export default SearchBox;
