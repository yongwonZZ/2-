function FlightFilterOptions() {
  return (
    <div>
      <label htmlFor="filter-arrivals">도착</label>
      <input type="checkbox" id="filter-arrivals" name="filter-arrivals" />
      <label htmlFor="filter-departures">출발</label>
      <input type="checkbox" id="filter-departures" name="filter-departures" />
      <label htmlFor="filter-t1">T1</label>
      <input type="checkbox" id="filter-t1" name="filter-t1" />
      <label htmlFor="filter-t2">T2</label>
      <input type="checkbox" id="filter-t2" name="filter-t2" />
    </div>
  );
}

export default FlightFilterOptions;
