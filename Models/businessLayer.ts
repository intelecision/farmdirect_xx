export class Address {
  public firstName: string;
  public lastName: string;
  public streetName: string;
  public LocationName: string;
  public digitalAddress: string;
  public nickName: string;
  public userId: string;
  public region: string;
  public mobile: string;
  public IsDefaultAddress: boolean = false;
  public city: string;
  public Latitude: number;
  public Longitude: number;

  constructor() {}

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  toString(): string {
    return JSON.stringify(this);
  }
}

export enum PaymentMethod {
  cc,
  mobileMoney,
  expressPay,
  payPal,
  none,
}

export class RewardFriendsAndFamily {
  public Id: number;
  public UserId: string;
  public ReferralCode: string;
  public DateIntroduced: Date;
  public RewardAmount: number;
  public PreviousBalance: number;
  public CurrentBalance: number;
  public LastRedeemDate: Date;
}
