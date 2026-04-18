import Types "../types/prayer";
import PrayerLib "../lib/prayer";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";

mixin (
  requests : Map.Map<Nat, Types.PrayerRequest>,
  nextId : [var Nat],
) {
  /// Create a new prayer request. Returns the auto-generated id.
  public func createPrayerRequest(
    name : ?Text,
    message : Text,
    anonymous : Bool,
  ) : async Nat {
    let now = Int.fromNat(Int.abs(Time.now()));
    let id = nextId[0];
    let (newId, _) = PrayerLib.create(requests, id, name, message, anonymous, now);
    nextId[0] := newId + 1;
    newId;
  };

  /// Return all prayer requests sorted newest first.
  public query func getPrayerRequests() : async [Types.PrayerRequest] {
    PrayerLib.listAll(requests);
  };

  /// Update the status of a prayer request.
  public func updatePrayerRequestStatus(
    id : Nat,
    status : Types.PrayerStatus,
  ) : async { #ok; #err : Text } {
    PrayerLib.updateStatus(requests, id, status);
  };

  /// Delete a prayer request by id.
  public func deletePrayerRequest(id : Nat) : async { #ok; #err : Text } {
    PrayerLib.delete(requests, id);
  };
};
