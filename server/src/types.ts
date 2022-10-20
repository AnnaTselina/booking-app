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
