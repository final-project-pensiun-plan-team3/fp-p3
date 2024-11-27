import { DateTime } from "luxon";

export function indonesianDate() {
  const currentWIB = DateTime.now().setZone("Asia/Jakarta");

  const isoString = currentWIB.toISO();
  if (!isoString) {
    throw new Error("Failed to generate a valid ISO string for the date");
  }
  
  return new Date(isoString);
}
