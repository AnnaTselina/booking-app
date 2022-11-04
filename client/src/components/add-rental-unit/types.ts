import React from "react";

export interface IPayload {
  type_of_place_id: { value: string; set: boolean };
  max_guests: { value: number; set: boolean };
  num_bedrooms: { value: number; set: boolean };
  num_beds: { value: number; set: boolean };
  num_bathrooms: { value: number; set: boolean };
  amenities_ids: { value: string[]; set: boolean };
  address: {
    id_country: {
      value: string;
      set: boolean;
    };
    id_state: {
      value: string;
      set: boolean;
    };
    city: {
      value: string;
      set: boolean;
    };
    street: {
      value: string;
      set: boolean;
    };
    zip: {
      value: string;
      set: boolean;
    };
    apartment: {
      value: string;
      set: boolean;
    };
  };
  title: {
    value: string;
    set: boolean;
  };
  description: {
    value: string;
    set: boolean;
  };
  price: {
    value: number;
    set: boolean;
  };
  images: {
    value: File[];
    set: boolean;
  };
}
export interface ICardProps {
  nextStepCallback: () => void;
  previousStepCallback: () => void;
  setPayload: React.Dispatch<React.SetStateAction<IPayload>>;
  payload: IPayload;
}
