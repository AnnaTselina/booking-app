import React, { useState, useMemo, Suspense } from "react";
import { useQuery } from "@apollo/client";
import { GET_ADD_RENTAL_UNIT_DATA } from "../../queries-graphql";
import redHouseImage from "../../assets/images/red-house.jpg";
import house1 from "../../assets/images/house-1.jpg";
import bedroomImage from "../../assets/images/bedroom.jpg";
import amenitiesImage from "../../assets/images/amenities.jpg";
import houseAddressImage from "../../assets/images/house-address.jpg";
import pinkHousesImage from "../../assets/images/pink-house.jpg";
import housePolaroid from "../../assets/images/house-polaroid.jpg";
import beachSeaside from "../../assets/images/beach-seaside.jpg";
import { ICardProps, IPayload } from "./types";
import "./styles.scss";

const StartingCard = React.lazy(() => import("./cards/starting-card"));
const TypeOfPlaceCard = React.lazy(() => import("./cards/type-of-place-card"));
const RentalUnitInNumbersCard = React.lazy(() => import("./cards/rental-unit-number"));
const AmenitiesCard = React.lazy(() => import("./cards/amenities-card"));
const AddressCard = React.lazy(() => import("./cards/address-card"));
const TitleAndPriceCard = React.lazy(() => import("./cards/title-and-price-card"));
const DropImages = React.lazy(() => import("./cards/drop-images"));
const FinalCard = React.lazy(() => import("./cards/final-card"));

const stages: {
  [key: string]: {
    // eslint-disable-next-line no-unused-vars
    element: React.LazyExoticComponent<(props: ICardProps) => React.ReactElement<ICardProps>>;
    image: string;
  };
} = {
  start: {
    element: StartingCard,
    image: house1,
  },
  typeOfPlace: {
    element: TypeOfPlaceCard,
    image: redHouseImage,
  },
  rentalUnitInNumbers: {
    element: RentalUnitInNumbersCard,
    image: bedroomImage,
  },
  amenities: {
    element: AmenitiesCard,
    image: amenitiesImage,
  },
  address: {
    element: AddressCard,
    image: houseAddressImage,
  },
  titleAndPrice: {
    element: TitleAndPriceCard,
    image: pinkHousesImage,
  },
  images: {
    element: DropImages,
    image: housePolaroid,
  },
  final: {
    element: FinalCard,
    image: beachSeaside,
  },
};

const AddRentalUnit = () => {
  const stagesNames = Object.keys(stages);

  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [payload, setPayload] = useState<IPayload>({
    type_of_place_id: { value: "", set: false },
    max_guests: { value: 0, set: false },
    num_bedrooms: { value: 0, set: false },
    num_beds: { value: 0, set: false },
    num_bathrooms: { value: 0, set: false },
    amenities_ids: { value: [""], set: true },
    address: {
      id_country: {
        value: "",
        set: false,
      },
      id_state: {
        value: "",
        set: false,
      },
      city: {
        value: "",
        set: false,
      },
      street: {
        value: "",
        set: false,
      },
      zip: {
        value: "",
        set: false,
      },
      apartment: {
        value: "",
        set: true,
      },
    },
    title: {
      value: "",
      set: false,
    },
    description: {
      value: "",
      set: false,
    },
    price: {
      value: 0,
      set: false,
    },
    images: {
      value: [],
      set: false,
    },
  });

  const CurrentCard = useMemo(
    () => stages[stagesNames[currentSectionIndex]].element,
    [currentSectionIndex],
  );

  const moveToNextCard = () => {
    setCurrentSectionIndex((state) => (stagesNames[state + 1] ? state + 1 : state));
  };

  const moveToPreviousCard = () => {
    setCurrentSectionIndex((state) => (stagesNames[state - 1] ? state - 1 : state));
  };

  useQuery(GET_ADD_RENTAL_UNIT_DATA);

  return (
    <div className="add-rental-unit">
      <Suspense fallback="-">
        <div className="add-rental-unit__content-box">
          <div className="add-rental-unit__content-box-image">
            <img src={stages[stagesNames[currentSectionIndex]].image} alt="add-rental-unit" />
          </div>
          <CurrentCard
            nextStepCallback={moveToNextCard}
            previousStepCallback={moveToPreviousCard}
            setPayload={setPayload}
            payload={payload}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default AddRentalUnit;
