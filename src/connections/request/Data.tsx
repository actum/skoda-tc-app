export interface Licence {
  code: string;
  name: string;
  price: number;
  purchasedLicense?: { endDate: string };
}

export interface User {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
}
