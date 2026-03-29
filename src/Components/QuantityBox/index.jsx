import { FaMinus, FaPlus } from "react-icons/fa6";
import Button from "@mui/material/Button";
import { useState } from "react";

const QuantityBox = () => {
  const [inputVal, setInputVal] = useState(0);

  const minus = () => {
    if (inputVal > 1) {
      setInputVal(inputVal - 1);
    }
  };

  const plus = () => {
    setInputVal(inputVal + 1);
  };

  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button onClick={minus} disabled={inputVal <= 1}>
        <FaMinus />
      </Button>

      <input
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <Button onClick={plus}>
        <FaPlus />
      </Button>
    </div>
  );
};

export default QuantityBox;
