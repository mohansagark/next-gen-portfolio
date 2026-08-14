export const EARTH_DAY = "/images/hero/earth-blue-marble.jpg";
export const EARTH_BUMP = "/images/hero/earth-topology.png";
export const EARTH_NIGHT = "/images/hero/earth-night.jpg";
export const DEMO_SIZE = 380;

/** Mid-density hubs — matches hero (more than default 8, less than the dense mesh) */
export const ARC_HUBS = [
  { lat: 17.385, lng: 78.4867 }, // Hyderabad
  { lat: 28.6139, lng: 77.209 }, // Delhi
  { lat: 1.3521, lng: 103.8198 }, // Singapore
  { lat: 35.6762, lng: 139.6503 }, // Tokyo
  { lat: -33.8688, lng: 151.2093 }, // Sydney
  { lat: 37.7749, lng: -122.4194 }, // San Francisco
  { lat: 40.7128, lng: -74.006 }, // New York
  { lat: 43.6532, lng: -79.3832 }, // Toronto
  { lat: 51.5074, lng: -0.1278 }, // London
  { lat: 52.52, lng: 13.405 }, // Berlin
  { lat: 25.2048, lng: 55.2708 }, // Dubai
  { lat: -26.2041, lng: 28.0473 }, // Johannesburg
  { lat: -23.5505, lng: -46.6333 }, // São Paulo
  { lat: 19.4326, lng: -99.1332 }, // Mexico City
];

export function buildArcs() {
  const arcs = [];
  const n = ARC_HUBS.length;
  const offsets = [3, 7];
  for (let i = 0; i < n; i += 1) {
    const start = ARC_HUBS[i];
    offsets.forEach((offset) => {
      const end = ARC_HUBS[(i + offset) % n];
      arcs.push({
        startLat: start.lat,
        startLng: start.lng,
        endLat: end.lat,
        endLng: end.lng,
      });
    });
  }
  return arcs;
}
