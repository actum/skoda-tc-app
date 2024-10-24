export interface Category {
  name: string;
  productList: Licence[];
}

export interface Licence {
  code: string;
  name: string;
  price: number;
  purchasedLicense?: { endDate: string };
  description?: string;
  categoryName?: string;
  productType?: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  address?: {
    id: string;
    street: string;
    houseNumber: number;
    city: string;
    postalCode: string;
    addressType: string;
    country: string;
  };
  creditCard?: {
    cvv: number;
    expiryMonth: number;
    expiryYear: number;
    id: string;
    number: string;
  };
}
