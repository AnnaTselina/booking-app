import { gql } from "@apollo/client";

export const GET_RENTAL_UNITS = gql`
  query GetRentalUnits($destination: String) {
    getRentalUnits(getRentalUnitsInput: { destination: $destination }) {
      id
      title
      price
      total_rating
      images {
        image_path
      }
      type_of_place {
        name
      }
      amenities {
        amenity {
          name
        }
      }
      address {
        city
        country {
          name
        }
      }
    }
  }
`;

export const GET_RENTAL_UNIT = gql`
  query GetRentalUnit($id: String!) {
    getRentalUnit(id: $id) {
      id
      max_guests
      num_bedrooms
      num_beds
      num_bathrooms
      title
      description
      price
      total_rating
      type_of_place {
        id
        name
      }
      images {
        id
        image_path
      }
      address {
        id
        city
        zip
        street
        apartment
        state {
          id
          name
        }
        country {
          id
          name
        }
      }
      amenities {
        amenity {
          id
          name
        }
      }
    }
  }
`;
