import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
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
