import { DateTime } from "luxon";

export function indonesianDate() {
  const currentWIB = DateTime.now().setZone("Asia/Jakarta");

  const isoString = currentWIB.toISO();
  if (!isoString) {
    throw new Error("Failed to generate a valid ISO string for the date");
  }

  return new Date(isoString);
}

export function FormatDate(dateStr: string, format = "dd-MM-yyyy, HH:mm:ss") {
  const parsedDate = DateTime.fromISO(dateStr);
  const formattedDate = parsedDate.toFormat(format);

  return formattedDate;
}
