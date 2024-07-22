import FlightFilterOption from "./FlightFilterOption";
import styles from "./FlightFilterOptions.module.css";

type FlightFilterStatus = {
  arrivals: boolean;
  departures: boolean;
  t1: boolean;
  t2: boolean;
};

type FlightFilterOptionsProps = {
  filter: FlightFilterStatus;
  onSwitch: (identifier: keyof FlightFilterStatus) => void;
};

function FlightFilterOptions({ filter, onSwitch }: FlightFilterOptionsProps) {
  return (
    <div className={styles["option-wrapper"]}>
      <FlightFilterOption
        label="도착"
        identifier="arrivals"
        filter={filter}
        onSwitch={onSwitch}
      />
      <FlightFilterOption
        label="출발"
        identifier="departures"
        filter={filter}
        onSwitch={onSwitch}
      />
      <FlightFilterOption
        label="T1"
        identifier="t1"
        filter={filter}
        onSwitch={onSwitch}
      />
      <FlightFilterOption
        label="T2"
        identifier="t2"
        filter={filter}
        onSwitch={onSwitch}
      />
    </div>
  );
}

export default FlightFilterOptions;
