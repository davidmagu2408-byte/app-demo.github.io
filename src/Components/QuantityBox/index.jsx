import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useState } from "react";

const QuantityBox = () => {
  const [inputVal, setinputVal] = useState(1);
  const minus = () => {
    if (inputVal !== 1 && inputVal > 0) {
      setinputVal(inputVal - 1);
    }
  };
  const plus = () => {
    setinputVal(inputVal + 1);
  };
  return (
    <>
      <div class="quantityDrop d-flex align-items-center">
        <Button>
          <FaMinus onClick={minus} />
        </Button>
        <input type="text" value={inputVal}></input>
        <Button>
          <FaPlus onClick={plus} />
        </Button>
      </div>
    </>
  );
};

export default QuantityBox;
