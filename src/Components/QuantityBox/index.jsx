import { FaMinus, FaPlus } from "react-icons/fa6";
import Button from "@mui/material/Button";
import { useState } from "react";

const QuantityBox = ({ value: controlledVal, onChange, max }) => {
  const [internalVal, setInternalVal] = useState(1);
  const isControlled = controlledVal !== undefined;
  const inputVal = isControlled ? controlledVal : internalVal;

  const setVal = (v) => {
    if (isControlled) {
      onChange?.(v);
    } else {
      setInternalVal(v);
    }
  };

  const minus = () => {
    if (inputVal > 1) setVal(inputVal - 1);
  };

  const plus = () => {
    if (max && inputVal >= max) return;
    setVal(inputVal + 1);
  };

  return (
    <div className="quantityDrop d-flex align-items-center">
      <Button onClick={minus} disabled={inputVal <= 1}>
        <FaMinus />
      </Button>
      <input
        type="text"
        value={inputVal}
        readOnly
      />
      <Button onClick={plus} disabled={max ? inputVal >= max : false}>
        <FaPlus />
      </Button>
    </div>
  );
};

export default QuantityBox;
