import { gql } from "@apollo/client";

export const GET_RENTAL_UNITS = gql`
  query GetRentalUnits($destination: String, $checkin: String, $checkout: String) {
    getRentalUnits(
      getRentalUnitsInput: { destination: $destination, checkin: $checkin, checkout: $checkout }
    ) {
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

    getRentalUnitAvailability(id: $id) {
      start_date
      end_date
    }
  }
`;

export const RESERVE_RENTAL_UNIT_MUTATION = gql`
  mutation ReserveRentalunit(
    $idRentalUnit: String!
    $numGuests: Int!
    $totalPrice: Float!
    $startDate: DateTime!
    $endDate: DateTime!
  ) {
    reserveRentalUnit(
      reserveRentalUnitInput: {
        id_rental_unit: $idRentalUnit
        num_guests: $numGuests
        total_price: $totalPrice
        start_date: $startDate
        end_date: $endDate
      }
    ) {
      id
    }
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(signUpInput: { email: $email, password: $password })
  }
`;

export const GET_USER = gql`
  query {
    getUser {
      id
      email
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const CONFIRM_USER_MUTATION = gql`
  mutation ConfirmUser($id: String!) {
    confirmUser(id: $id)
  }
`;
