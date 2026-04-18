import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { PrayerStatus } from "../backend";
import type { CreatePrayerRequestInput } from "../types";

const QUERY_KEY = ["prayerRequests"];

export function useGetPrayerRequests() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      const requests = await actor.getPrayerRequests();
      return [...requests].sort((a, b) => Number(b.createdAt - a.createdAt));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreatePrayerRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreatePrayerRequestInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createPrayerRequest(
        input.name,
        input.message,
        input.anonymous,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdatePrayerStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: bigint; status: PrayerStatus }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.updatePrayerRequestStatus(id, status);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeletePrayerRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.deletePrayerRequest(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
