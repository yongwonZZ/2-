import styles from "./FlightFilterOption.module.css";

type FlightFilterStatus = {
  arrivals: boolean;
  departures: boolean;
  t1: boolean;
  t2: boolean;
};

type FlightFilterOptionProps = {
  label: "도착" | "출발" | "T1" | "T2";
  identifier: "arrivals" | "departures" | "t1" | "t2";
  filter: FlightFilterStatus;
  onSwitch: (identifier: keyof FlightFilterStatus) => void;
};

function FlightFilterOption({
  label,
  identifier,
  filter,
  onSwitch,
}: FlightFilterOptionProps) {
  const labelInputName = "filter-" + identifier;

  return (
    <label htmlFor={labelInputName}>
      <input
        type="checkbox"
        id={labelInputName}
        className={styles.checkbox}
        name={labelInputName}
        checked={filter[identifier]}
        onChange={() => onSwitch(identifier)}
      />
      <span>{label}</span>
    </label>
  );
}

export default FlightFilterOption;
