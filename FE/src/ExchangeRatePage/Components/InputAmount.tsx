// InputAmount.tsx
import React from "react";
import { FaBackspace, FaExchangeAlt } from "react-icons/fa";
import "../Styles/InputAmount.css";

interface InputAmountProps {
  setAmount: (amount: number) => void;
  onSwapCountries: () => void;
}

const InputAmount: React.FC<InputAmountProps> = ({
  setAmount,
  onSwapCountries,
}) => {
  const [inputValue, setInputValue] = React.useState<string>("");

  /**  해당 버튼을 클릭했을때 amount변경  */
  const handleButtonClick = (value: string) => {
    const newValue = inputValue + value;
    setInputValue(newValue);
    setAmount(parseFloat(newValue));
  };

  /** 입력값 지우기 함수 */
  const handleBack = () => {
    if (inputValue.length > 0) {
      const newValue = inputValue.slice(0, -1);
      setInputValue(newValue);
      setAmount(parseFloat(newValue) || 0);
    }
  };
  /** 두 나라 바꾸기 함수 */
  const handleChangeCountry = () => {
    onSwapCountries();
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
        <button className="keypad keypad-control-btn" onClick={handleBack}>
          <FaBackspace />
        </button>
        <button
          className="keypad keypad-control-btn"
          onClick={handleChangeCountry}
        >
          <FaExchangeAlt />
        </button>
        <button className="keypad keypad-control-btn" onClick={handleClear}>
          C
        </button>
        <button className="keypad keypad-control-btn"></button>
      </div>
    </div>
  );
};

export default InputAmount;
