/* eslint-disable no-use-before-define */
export interface IRentalUnit {
  id: string;
  max_guests: number;
  num_bedrooms: number;
  num_beds: number;
  num_bathrooms: number;
  title: string;
  description: string;
  price: number;
  total_rating: number | null;
  type_of_place: ITypeOfPlace;
  amenities: IRentalUnitAmenity[];
  images: IRentalUnitImage[];
  address: IRentalUnitAddress;
}

export interface IRentalUnitAddress {
  id: string;
  city: string;
  zip: string;
  street: string;
  apartment: string;
  state: IState;
  country: ICountry;
}

export interface IRentalUnitImage {
  image_path: string;
}

export interface ITypeOfPlace {
  id: string;
  name: string;
}

export interface IRentalUnitAmenity {
  id: string;
  rental_unit: IRentalUnit;
  amenity: IAmenity;
}

export interface IAmenity {
  id: string;
  name: string;
}

export interface ICountry {
  id: string;
  name: string;
  has_states: boolean;
}

export interface IState {
  id: string;
  name: string;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  confirmed: boolean;
  is_host: boolean;
}

export interface IGuest {
  id: string;
  user: IUser;
  bookings: [IBooking];
}

export interface IBooking {
  id: string;
  num_guests: number;
  start_date: Date;
  end_date: Date;
  status: string;
  total_price: number;
  rental_unit: IRentalUnit;
  guest: IGuest;
}

export interface IHost {
  id: string;
  user: IUser;
  rental_units?: IHostRentalUnits[];
}

export interface IHostRentalUnits {
  id: string;
  host: IHost;
  rental_unit: IRentalUnit;
}
