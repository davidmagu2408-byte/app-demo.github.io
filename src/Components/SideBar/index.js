//import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "react-range-slider-input/dist/style.css";
import RangeSlider from "react-range-slider-input";
import { useState } from "react";

const SideBar = () => {
  const [value, setValue] = useState([100, 60000]);
  //const [value2, setValue2] = useState(0);

  return (
    <div className="sidebar">
      <div className="filterBox">
        <h6>PRODUCT CATEGORIES</h6>
        <div className="scroll">
          <ul>
            <li>
              <FormControlLabel
                className="w-100"
                control={<Checkbox />}
                label="men"
              />
            </li>
            <li>
              <FormControlLabel
                className="w-100"
                control={<Checkbox />}
                label="men"
              />
            </li>
            <li>
              <FormControlLabel
                className="w-100"
                control={<Checkbox />}
                label="men"
              />
            </li>
            <li>
              <FormControlLabel
                className="w-100"
                control={<Checkbox />}
                label="men"
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="filterBox">
        <h6>FILTER BY PRICE</h6>
        <RangeSlider
          value={value}
          onInput={setValue}
          min={100}
          max={60000}
          step={5}
        />
        <div className="d-flex pt-2 pb-2 priceRange">
          <span>
            From: <strong className="text-success">$ {value[0]}</strong>
          </span>
          <span className="ms-auto">
            From: <strong className="text-success">$ {value[1]}</strong>
          </span>
        </div>
      </div>
      <div className="filterBox">
        <h6>FILTER BY RATING</h6>
        <div className="scroll">
          <ul>
            <li>
              <FormControlLabel
                className="w-100"
                control={<Checkbox />}
                label="men"
              />
            </li>
            <li>
              <FormControlLabel
                className="w-100"
                control={<Checkbox />}
                label="men"
              />
            </li>
          </ul>
        </div>
      </div>
      <div className="">
        <h6>FEATURED PRODUCTS</h6>
        <div className="scroll">
          <ul>
            <li>
              <FormControlLabel
                className="w-100"
                control={<Checkbox />}
                label="men"
              />
            </li>
            <li>
              <FormControlLabel
                className="w-100"
                control={<Checkbox />}
                label="men"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
