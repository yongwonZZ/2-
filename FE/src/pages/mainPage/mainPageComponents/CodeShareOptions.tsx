import styles from "./CodeShareOptions.module.css";

type CodeShareOptionsProps = {
  onSwitch: (value: boolean) => void;
  isChecked: boolean; // 스위치의 초기 상태 설정
};

function CodeShareOptions({ onSwitch, isChecked }: CodeShareOptionsProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSwitch(event.target.checked);
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="codeshare-checkbox" className={styles.label}>
        코드쉐어
      </label>
      <label className={styles.switch}>
        <input
          type="checkbox"
          id="codeshare-checkbox"
          name="codeshare-checkbox"
          checked={isChecked}
          onChange={handleInputChange}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}

export default CodeShareOptions;
