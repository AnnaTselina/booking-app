import { Dispatch } from "react";

export type State = {
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
};

/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export enum ActionType {
  TYPE_OF_PLACE_ID = "type_of_place_id",
  MAX_GUESTS = "max_guests",
  NUM_BEDROOMS = "num_bedrooms",
  NUM_BEDS = "num_beds",
  NUM_BATHROOMS = "num_bathrooms",
  AMENITIES_IDS = "amenities_ids",
  ADDRESS = "address",
  TITLE = "title",
  DESCRIPTION = "description",
  PRICE = "price",
  IMAGES = "images",
}

export type Action = {
  type: ActionType;
  payload:
    | { value: string | number | string[] | File[]; set: boolean }
    | { [key: string]: { value: string; set: boolean } };
};
export interface ICardProps {
  nextStepCallback: () => void;
  previousStepCallback: () => void;
  dispatch: Dispatch<Action>;
  payload: State;
}
