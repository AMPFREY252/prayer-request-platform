import type { PrayerRequest, PrayerStatus } from "../backend";

export type { PrayerRequest, PrayerStatus };

export interface CreatePrayerRequestInput {
  name: string | null;
  message: string;
  anonymous: boolean;
}

export type FilterStatus = "all" | "pending" | "prayed";
