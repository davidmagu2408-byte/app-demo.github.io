import { FaAngleDown } from "react-icons/fa";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { IoSearch } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import Slide from "@mui/material/Slide";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CountryDropDown = () => {
  const [openModel, setopenModel] = useState(false);
  const [selectTab, setselectTab] = useState(null);
  const [countryList, setcountryList] = useState([]);
  const context = useContext(MyContext);

  const setselectCountry = (index, country) => {
    setselectTab(index);
    setopenModel(false);
    context.setselectedCountry(country);
  };

  const filterList = (e) => {
    const keyword = e.target.value.toLowerCase();
    if (keyword !== "") {
      const list = countryList.filter((item) => {
        return item.country.toLowerCase().includes(keyword);
      });
      setcountryList(list);
    } else {
      setcountryList(context.countryList);
    }
  };
  useEffect(() => {
    setcountryList(context.countryList);
  }, [context.countryList]);
  return (
    <>
      <div>
        <Button className="countryDrop" onClick={() => setopenModel(true)}>
          <div className="info d-flex flex-column">
            <span className="label">Chọn vị trí nơi ở</span>
            <span className="location">
              {context.selectedCountry && context.selectedCountry.length > 20
                ? context.selectedCountry.substr(0, 20) + "..."
                : context.selectedCountry || "Chọn vị trí"}
            </span>
          </div>
          <span className="ml-auto">
            <FaAngleDown />
          </span>
        </Button>
        <Dialog
          open={openModel}
          onClose={() => setopenModel(false)}
          className="locationModel"
          slots={{ transition: Transition }}
        >
          <h4 className="mb-0">Choose your Delivery Location</h4>
          <p>Enter your address and we will specify the offer for your area.</p>
          <Button className="close_" onClick={() => setopenModel(false)}>
            <IoIosClose />
          </Button>
          <div className="headerSearch w-100">
            <input
              type="text"
              placeholder="Search your area..."
              onChange={filterList}
            />
            <Button>
              <IoSearch />
            </Button>
          </div>
          <ul className="countryList mt-3">
            {countryList &&
              countryList.length !== 0 &&
              countryList?.map((item, index) => {
                return (
                  <li key={index}>
                    <Button
                      onClick={() => setselectCountry(index, item.name)}
                      className={`${selectTab === index ? "active" : ""}`}
                    >
                      {item.name}
                    </Button>
                  </li>
                );
              })}
          </ul>
        </Dialog>
      </div>
    </>
  );
};

export default CountryDropDown;
