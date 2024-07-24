// InputAmount.tsx
import React from "react";
import { FaBackspace, FaExchangeAlt } from "react-icons/fa";
import "../Styles/InputAmount.css";

interface InputAmountProps {
  setAmount: (amount: number) => void;
}

const InputAmount: React.FC<InputAmountProps> = ({ setAmount }) => {
  const [inputValue, setInputValue] = React.useState<string>("");

  /**  해당 버튼을 클릭했을때 amount변경  */
  const handleButtonClick = (value: string) => {
    const newValue = inputValue + value;
    setInputValue(newValue);
    setAmount(parseFloat(newValue));
  };

  /**  입력값 초기화 함수  */
  const handleClear = () => {
    setInputValue("");
    setAmount(0);
  };

  return (
    <div className="amount-keypad">
      <div className="amount-ketpad-number">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            className="keypad keypad-btn"
            key={num}
            onClick={() => handleButtonClick(num.toString())}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="keypad-control">
        <button className="keypad keypad-control-btn" onClick={handleClear}>
          <FaBackspace />
        </button>
        <button className="keypad keypad-control-btn" onClick={handleClear}>
          <FaExchangeAlt />
        </button>
        <button className="keypad keypad-control-btn" onClick={handleClear}>
          C
        </button>
      </div>
    </div>
  );
};

export default InputAmount;
