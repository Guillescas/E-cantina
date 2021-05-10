export interface IUserProps {
  id: number;
  email: string;
  password: string;
  name: string;
  type: 'restaurant' | 'client' | 'establishment';
  CNPJ?: string;
  restaurantType?: string;
  rating?: number;
  Address?: IAddressProps;
  CPF?: string;
  imageURL: string;
}

export interface IAddressProps {
  street: string;
  number: string;
  complement: string;
}
