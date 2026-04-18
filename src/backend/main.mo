import Types "types/prayer";
import PrayerMixin "mixins/prayer-api";
import Map "mo:core/Map";

actor {
  let requests = Map.empty<Nat, Types.PrayerRequest>();
  let nextId = [var 0 : Nat];

  include PrayerMixin(requests, nextId);
};
