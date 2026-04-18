import CommonTypes "common";

module {
  public type Timestamp = CommonTypes.Timestamp;

  public type PrayerStatus = {
    #pending;
    #prayed;
  };

  public type PrayerRequest = {
    id : Nat;
    name : ?Text;
    message : Text;
    anonymous : Bool;
    status : PrayerStatus;
    createdAt : Timestamp;
  };
};
