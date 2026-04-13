import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "react-range-slider-input/dist/style.css";
import RangeSlider from "react-range-slider-input";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import Button from "@mui/material/Button";

const SideBar = ({ categoryId, subCatId, onPriceFilter }) => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [value, setValue] = useState([100, 60000000]);

  const categoryData = context.categoryData;
  const subcategoryData = context.subcategoryData;

  const categories = categoryData?.category || [];
  const subcategories = subcategoryData?.subCategory || [];

  // Subcategories for the current category
  const currentSubCats = subcategories.filter((s) => s.category === categoryId);

  useEffect(() => {
    setValue([100, 60000000]);
  }, [categoryId, subCatId]);

  const handleApplyFilter = () => {
    if (onPriceFilter) {
      onPriceFilter(value[0], value[1]);
    }
  };

  return (
    <div className="sidebar">
      <div className="filterBox">
        <h6>DANH MỤC SẢN PHẨM</h6>
        <div className="scroll">
          <ul>
            {categories.map((cat) => (
              <li key={cat._id}>
                <FormControlLabel
                  className="w-100"
                  control={
                    <Checkbox
                      checked={cat._id === categoryId && !subCatId}
                      onChange={() => navigate(`/cat/${cat._id}`)}
                    />
                  }
                  label={cat.name}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {currentSubCats.length > 0 && (
        <div className="filterBox">
          <h6>DANH MỤC PHỤ</h6>
          <div className="scroll">
            <ul>
              {currentSubCats.map((sub) => (
                <li key={sub._id}>
                  <FormControlLabel
                    className="w-100"
                    control={
                      <Checkbox
                        checked={sub._id === subCatId || sub.id === subCatId}
                        onChange={() =>
                          navigate(`/cat/${categoryId}?subCat=${sub._id}`)
                        }
                      />
                    }
                    label={sub.name}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="filterBox">
        <h6>LỌC THEO GIÁ</h6>
        <RangeSlider
          value={value}
          onInput={setValue}
          min={100}
          max={60000000}
          step={10000}
        />
        <div className="d-flex pt-2 pb-2 priceRange">
          <span>
            Từ:{" "}
            <strong className="text-success">
              {value[0].toLocaleString("vi-VN")}đ
            </strong>
          </span>
          <span className="ms-auto">
            Đến:{" "}
            <strong className="text-success">
              {value[1].toLocaleString("vi-VN")}đ
            </strong>
          </span>
        </div>
        <Button
          className="btn-blue btn-sm w-100 mt-2"
          onClick={handleApplyFilter}
          variant="contained"
          size="small"
        >
          Áp dụng
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
