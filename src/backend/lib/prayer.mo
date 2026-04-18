import Types "../types/prayer";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Int "mo:core/Int";

module {
  public type PrayerRequest = Types.PrayerRequest;
  public type PrayerStatus = Types.PrayerStatus;

  /// Create a new prayer request and return its auto-generated id.
  public func create(
    requests : Map.Map<Nat, PrayerRequest>,
    nextId : Nat,
    name : ?Text,
    message : Text,
    anonymous : Bool,
    now : Int,
  ) : (Nat, PrayerRequest) {
    let id = nextId;
    let req : PrayerRequest = {
      id;
      name = if (anonymous) null else name;
      message;
      anonymous;
      status = #pending;
      createdAt = now;
    };
    requests.add(id, req);
    (id, req);
  };

  /// Return all prayer requests sorted by createdAt descending (newest first).
  public func listAll(requests : Map.Map<Nat, PrayerRequest>) : [PrayerRequest] {
    let arr = requests.values().toArray();
    arr.sort<PrayerRequest>(
      func(a, b) = Int.compare(b.createdAt, a.createdAt),
    );
  };

  /// Update the status of a prayer request by id.
  public func updateStatus(
    requests : Map.Map<Nat, PrayerRequest>,
    id : Nat,
    status : PrayerStatus,
  ) : { #ok; #err : Text } {
    switch (requests.get(id)) {
      case null { #err("Prayer request not found") };
      case (?req) {
        requests.add(id, { req with status });
        #ok;
      };
    };
  };

  /// Delete a prayer request by id.
  public func delete(
    requests : Map.Map<Nat, PrayerRequest>,
    id : Nat,
  ) : { #ok; #err : Text } {
    if (not requests.containsKey(id)) {
      return #err("Prayer request not found");
    };
    requests.remove(id);
    #ok;
  };
};
