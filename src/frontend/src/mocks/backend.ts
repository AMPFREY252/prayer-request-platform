import type { backendInterface } from "../backend";
import { PrayerStatus } from "../backend";

export const mockBackend: backendInterface = {
  createPrayerRequest: async (_name, _message, _anonymous) => BigInt(5),

  deletePrayerRequest: async (_id) => ({ __kind__: "ok", ok: null }),

  getPrayerRequests: async () => [
    {
      id: BigInt(1),
      status: PrayerStatus.pending,
      name: "Mary Johnson",
      createdAt: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
      anonymous: false,
      message: "Please pray for my family's health and healing. We are going through a difficult time and need God's guidance and strength.",
    },
    {
      id: BigInt(2),
      status: PrayerStatus.prayed,
      name: undefined,
      createdAt: BigInt(Date.now() - 4 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
      anonymous: true,
      message: "Seeking strength and peace during this challenging season of life. Trust in the Lord's plan.",
    },
    {
      id: BigInt(3),
      status: PrayerStatus.pending,
      name: "Robert Kim",
      createdAt: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
      anonymous: false,
      message: "Prayer for guidance as I make a major life decision. May God's wisdom lead my path.",
    },
    {
      id: BigInt(4),
      status: PrayerStatus.prayed,
      name: "Sarah Mitchell",
      createdAt: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
      anonymous: false,
      message: "Recovering from surgery — please lift me up in prayer for a swift and complete recovery.",
    },
  ],

  updatePrayerRequestStatus: async (_id, _status) => ({ __kind__: "ok", ok: null }),
};
