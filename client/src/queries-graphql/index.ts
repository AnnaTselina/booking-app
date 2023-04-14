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
      is_host
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

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { username: $email, password: $password }) {
      id
    }
  }
`;

export const GET_TYPES_OF_PLACES_QUERY = gql`
  query {
    getTypesOfPlaces {
      id
      name
    }
  }
`;

export const GET_AMENITIES = gql`
  query {
    getAmenities {
      id
      name
    }
  }
`;

export const GET_COUNTRIES = gql`
  query {
    getCountries {
      id
      name
    }
  }
`;

export const GET_STATES = gql`
  query GetStates($countryId: String!) {
    getStates(id: $countryId) {
      id
      name
    }
  }
`;

export const GET_ADD_RENTAL_UNIT_DATA = gql`
  query {
    getTypesOfPlaces {
      id
      name
    }
    getAmenities {
      id
      name
    }
    getCountries {
      id
      name
    }
  }
`;

export const ADD_RENTAL_UNIT_MUTATION = gql`
  mutation AddRentalUnit(
    $type_of_place_id: String!
    $max_guests: Int!
    $num_bedrooms: Int!
    $num_beds: Int!
    $num_bathrooms: Int!
    $title: String!
    $description: String!
    $price: Float!
    $amenities_ids: [String!]!
    $id_country: String!
    $id_state: String!
    $city: String!
    $street: String!
    $zip: String!
    $apartment: String!
    $images: [Upload!]!
  ) {
    addRentalUnit(
      addRentalUnitInput: {
        type_of_place_id: $type_of_place_id
        max_guests: $max_guests
        num_bedrooms: $num_bedrooms
        num_beds: $num_beds
        num_bathrooms: $num_bathrooms
        title: $title
        description: $description
        price: $price
        amenities_ids: $amenities_ids
        id_country: $id_country
        id_state: $id_state
        city: $city
        street: $street
        zip: $zip
        apartment: $apartment
        images: $images
      }
    )
  }
`;

export const CHECK_RENTAL_UNIT_AVAILABILITY = gql`
  query CheckRentalUnitAvailability(
    $rentalUnitId: String!
    $checkIn: DateTime!
    $checkOut: DateTime!
  ) {
    checkIfRentalUnitAvailable(
      rentalUnitAvailabilityInput: {
        id_rental_unit: $rentalUnitId
        start_date: $checkIn
        end_date: $checkOut
      }
    )
  }
`;

export const GET_HOST_BOOKINGS = gql`
  query GetHostBokings($status: String) {
    getHostBookings(hostBookingsInput: { status: $status }) {
      id
      status
      total_price
      start_date
      end_date
      rental_unit {
        id
        title
        images {
          image_path
        }
      }
      guest {
        id
        user {
          id
          email
          name
        }
      }
    }
  }
`;

export const ACCEPT_BOOKING_MUTATION = gql`
  mutation AcceptBooking($id: String!) {
    acceptIncomingBooking(bookingId: $id) {
      id
      status
    }
  }
`;
