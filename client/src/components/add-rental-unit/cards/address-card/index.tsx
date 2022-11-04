import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_COUNTRIES, GET_STATES } from "../../../../queries-graphql";
import { ICountry, IState } from "../../../../utils/types";
import { ICardProps } from "../../types";

const heading = "Let us know where it is located";

const AddressCard = (props: ICardProps) => {
  const { nextStepCallback, previousStepCallback, setPayload, payload } = props;

  const { data: dataCountries } = useQuery(GET_COUNTRIES);

  const [getStates, { data: dataStates }] = useLazyQuery(GET_STATES);

  const handleCountryChange = (id: string) => {
    setPayload((state) => ({
      ...state,
      address: {
        ...state.address,
        id_country: {
          value: id,
          set: !!id.length,
        },
      },
    }));

    getStates({
      variables: {
        countryId: id,
      },
    }).then((result) => {
      if (result?.data?.getStates) {
        setPayload((state) => ({
          ...state,
          address: {
            ...state.address,
            id_state: {
              value: "",
              set: !result?.data?.getStates?.length,
            },
          },
        }));
      }
    });
  };

  const handleStateChange = (id: string) => {
    setPayload((state) => ({
      ...state,
      address: { ...state.address, id_state: { value: id, set: !!id.length } },
    }));
  };

  return (
    <div className="add-rental-unit__content-box-form">
      <h3 className="form-heading">{heading}</h3>
      {dataCountries?.getCountries && (
        <div className="add-rental-unit__address">
          <div className="add-rental-unit__address-country">
            <label htmlFor="country">Country:</label>
            <select
              name="country"
              id="country"
              onChange={(e) => {
                handleCountryChange(e.target.value);
              }}
              value={payload.address.id_country.value}
            >
              <option value=""> </option>
              {dataCountries.getCountries.map((country: ICountry) => (
                <option value={country.id} key={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="add-rental-unit__address-state">
            <label htmlFor="state">State:</label>
            <select
              name="state"
              id="state"
              disabled={!dataStates || !dataStates.getStates?.length}
              onChange={(e) => {
                handleStateChange(e.target.value);
              }}
              value={payload.address.id_state.value}
            >
              <option value=""> </option>
              {dataStates?.getStates?.map((state: IState) => (
                <option value={state.id} key={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="add-rental-unit__address-city">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              onChange={(e) => {
                setPayload((state) => ({
                  ...state,
                  address: {
                    ...state.address,
                    city: {
                      value: e.target.value,
                      set: !!e.target.value.length,
                    },
                  },
                }));
              }}
              value={payload.address.city.value}
            />
          </div>

          <div className="add-rental-unit__address-street">
            <label htmlFor="street">Street (with building number)</label>
            <input
              type="text"
              id="street"
              onChange={(e) => {
                setPayload((state) => ({
                  ...state,
                  address: {
                    ...state.address,
                    street: {
                      value: e.target.value,
                      set: !!e.target.value.length,
                    },
                  },
                }));
              }}
              value={payload.address.street.value}
            />
          </div>

          <div className="add-rental-unit__address-zip">
            <label htmlFor="zip">Zip</label>
            <input
              type="text"
              id="zip"
              onChange={(e) => {
                setPayload((state) => ({
                  ...state,
                  address: {
                    ...state.address,
                    zip: {
                      value: e.target.value,
                      set: !!e.target.value.length,
                    },
                  },
                }));
              }}
              value={payload.address.zip.value}
            />
          </div>

          <div className="add-rental-unit__address-apartment">
            <label htmlFor="apartment">Apartment (optional)</label>
            <input
              type="text"
              id="apartment"
              onChange={(e) => {
                setPayload((state) => ({
                  ...state,
                  address: {
                    ...state.address,
                    apartment: {
                      value: e.target.value,
                      set: true,
                    },
                  },
                }));
              }}
              value={payload.address.apartment.value}
            />
          </div>
        </div>
      )}

      <div className="form-button">
        <button
          type="button"
          onClick={() => {
            previousStepCallback();
          }}
        >
          back
        </button>
        <button
          type="button"
          onClick={() => {
            nextStepCallback();
          }}
          disabled={!Object.values(payload.address).every((i) => i.set)}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
