import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface PrayerRequest {
    id: bigint;
    status: PrayerStatus;
    name?: string;
    createdAt: Timestamp;
    anonymous: boolean;
    message: string;
}
export enum PrayerStatus {
    pending = "pending",
    prayed = "prayed"
}
export interface backendInterface {
    createPrayerRequest(name: string | null, message: string, anonymous: boolean): Promise<bigint>;
    deletePrayerRequest(id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getPrayerRequests(): Promise<Array<PrayerRequest>>;
    updatePrayerRequestStatus(id: bigint, status: PrayerStatus): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
