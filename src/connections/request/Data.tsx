export interface Category {
  name: string;
  licences: Licence[];
}

export interface Licence {
  code: string;
  name: string;
  price: number;
  purchasedLicense?: { endDate: string };
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address?: {
    id: string;
    street: string;
    city: string;
    postalCode: string;
    addressType: string;
    country: string;
  };
}
