import { IoSearch } from "react-icons/io5";
import Button from "@mui/material/Button";

const SearchBox = () => {
  return (
    <>
      <div className="headerSearch ms-3">
        <input type="text" placeholder="Search for products..." />
        <Button>
          <IoSearch />
        </Button>
      </div>
    </>
  );
};

export default SearchBox;
