type CodeShareOptionsProps = {
  onSwitch: (value: boolean) => void;
  isChecked: boolean; // 스위치의 초기 상태 설정
};

function CodeShareOptions({ onSwitch, isChecked }: CodeShareOptionsProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSwitch(event.target.checked);
  };

  return (
    <div>
      <label htmlFor="codeshare-checkbox">코드쉐어</label>
      <input
        type="checkbox"
        id="codeshare-checkbox"
        name="codeshare-checkbox"
        checked={isChecked}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default CodeShareOptions;
