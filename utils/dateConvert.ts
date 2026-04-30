// utils/dateConvert.ts
import { DateValue } from "@heroui/react";
import { parseDate } from "@internationalized/date";

/** Converts a HeroUI DateValue → "YYYY-MM-DD" string */
export function formatDateValue(dateValue: DateValue | null): string | null {
  if (!dateValue) return null;
  try {
    const { year, month, day } = dateValue;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  } catch {
    return null;
  }
}

/** Converts a "YYYY-MM-DD" (or ISO) string → DateValue */
// export function parseDateValue(dateString: string | null): DateValue | null {
export function parseDateValue(value: DateValue | string | null | undefined): DateValue | null {
  if (!value) return null;
  try {
    return parseDate(value.toString().split("T")[0]); // normalize
  } catch {
    return null;
  }
}


export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};