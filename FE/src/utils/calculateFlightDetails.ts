import airportCoords from './airportCoords';

const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
    const R = 6371.0; // 지구 반지름 (킬로미터)

    const lat1 = radians(coord1[0]);
    const lon1 = radians(coord1[1]);
    const lat2 = radians(coord2[0]);
    const lon2 = radians(coord2[1]);

    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;

    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

const radians = (degrees: number): number => {
    return (degrees * Math.PI) / 180;
};

const calculateFlightDetails = (departureCode: string, arrivalCode: string, averageSpeed = 900) => {
    const departureCoord = airportCoords[departureCode] || [0, 0];
    const arrivalCoord = airportCoords[arrivalCode] || [0, 0];
    const distance = calculateDistance(departureCoord, arrivalCoord);
    const flightDurationHours = distance / averageSpeed;
    const flightDuration = flightDurationHours * 60 * 60 * 1000; // milliseconds
    return { distance, flightDuration };
};

export { calculateDistance, calculateFlightDetails };
