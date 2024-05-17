export class Address {
  constructor(
    fistName,
    lastName,
    streetName,
    LocationName,
    digitalAddress,
    nickName
  ) {
    this.fistName = fistName;
    this.lastName = lastName;
    this.streetName = streetName;
    this.LocationName = LocationName;
    this.digitalAddress = digitalAddress;
    this.nickName = nickName;
  }
  fullName() {
    return this.fistName + " " + this.lastName;
  }
}
