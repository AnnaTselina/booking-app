import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RentalUnit } from "./entities/rental-unit.entity";
import { In, Not, Repository } from "typeorm";
import { RentalUnitImage } from "./entities/rental-unit-image.entity";
import { Country } from "./entities/country.entity";
import { State } from "./entities/state.entity";
import { Amenity } from "./entities/amenity.entity";
import { AddRentalUnitInput, ReserveRentalUnitInput } from "./dto/inputs";
import { BookingService } from "../booking/booking.service";
import { GuestService } from "../guest/guest.service";
import { GraphQLError } from "graphql";
import { codes } from "src/error-handling/format-error-graphql";
import { TypeOfPlace } from "./entities/type-of-place.entity";
import { FileUpload } from "graphql-upload";
import { UPLOAD_DIR } from "src/utils/constants";
import { createWriteStream, unlink } from "fs";
import { RentalUnitAmenity } from "./entities/rental-unit-amenity.entity";
import { RentalUnitAddress } from "./entities/rental-unit-address.entity";
import { HostService } from "../host/host.service";

@Injectable()
export class RentalUnitService {
  constructor(
    @InjectRepository(RentalUnit)
    private rentalUnitRepository: Repository<RentalUnit>,

    @InjectRepository(RentalUnitImage)
    private rentalUnitImageRepository: Repository<RentalUnitImage>,

    @InjectRepository(Country)
    private countryRepository: Repository<Country>,

    @InjectRepository(Amenity)
    private amenityRepository: Repository<Amenity>,

    @InjectRepository(TypeOfPlace)
    private typeOfPlaceRepository: Repository<TypeOfPlace>,

    @InjectRepository(RentalUnitAmenity)
    private rentalUnitAmenityRepository: Repository<RentalUnitAmenity>,

    @InjectRepository(RentalUnitAddress)
    private rentalUnitAddressRepository: Repository<RentalUnitAddress>,

    @InjectRepository(State)
    private stateRepository: Repository<State>,

    private bookingService: BookingService,
    private guestService: GuestService,
    private hostService: HostService,
  ) {}

  async getRentalUnits(
    destination?: string,
    checkIn?: string,
    checkOut?: string,
  ) {
    let bookedRentalUnitsIds: string[] = [];

    if (checkIn && checkOut) {
      bookedRentalUnitsIds = await this.bookingService.getBookedRentalUnitsIds(
        new Date(checkIn),
        new Date(checkOut),
      );
    }

    const query = this.rentalUnitRepository.createQueryBuilder("rental-unit");

    query
      .innerJoin("rental-unit.images", "rental-unit-image")
      .innerJoin("rental-unit.type_of_place", "type-of-place")
      .innerJoin("rental-unit.address", "rental-unit-address")
      .leftJoin("rental-unit.bookings", "booking")
      .leftJoinAndMapOne(
        "rental-unit-address.country",
        Country,
        "country",
        "rental-unit-address.countryId = country.id",
      );

    if (destination) {
      query
        .where("LOWER(rental-unit-address.city) = :city", {
          city: destination.toLowerCase(),
        })
        .orWhere("LOWER(country.name) = :country", {
          country: destination.toLowerCase(),
        });
    }

    if (bookedRentalUnitsIds.length) {
      query.where({ id: Not(In(bookedRentalUnitsIds)) });
    }

    query.select([
      "rental-unit",
      "rental-unit-image",
      "type-of-place",
      "rental-unit-address",
      "country",
      "booking",
    ]);

    const result = await query.getMany();

    return result;
  }

  async getRentalUnit(id: string) {
    const result = await this.rentalUnitRepository
      .createQueryBuilder("rental-unit")
      .where({ id })
      .innerJoin("rental-unit.images", "rental-unit-image")
      .innerJoin("rental-unit.type_of_place", "type-of-place")
      .innerJoin("rental-unit.address", "rental-unit-address")
      .innerJoin("rental-unit.amenities", "rental-unit-amenity")
      .leftJoinAndMapOne(
        "rental-unit-address.country",
        Country,
        "country",
        "rental-unit-address.countryId = country.id",
      )
      .leftJoinAndMapOne(
        "rental-unit-address.state",
        State,
        "state",
        "rental-unit-address.stateId = state.id",
      )
      .leftJoinAndMapOne(
        "rental-unit-amenity.amenity",
        Amenity,
        "amenity",
        "rental-unit-amenity.amenityId = amenity.id",
      )
      .select([
        "rental-unit",
        "type-of-place",
        "rental-unit-image",
        "rental-unit-address",
        "rental-unit-address.country",
        "country",
        "state",
        "rental-unit-amenity",
        "amenity",
      ])
      .getOne();

    return result;
  }

  async reserveRentalUnit(
    reserveRentalUnitInput: ReserveRentalUnitInput,
    userId: string,
  ) {
    const rentalUnit = await this.getRentalUnit(
      reserveRentalUnitInput.id_rental_unit,
    );
    const guest = await this.guestService.getGuestByUserId(userId);

    if (!guest) {
      throw new GraphQLError("Can't find guest.", {
        extensions: {
          custom: true,
          code: codes.bad_user_input,
          status: 400,
        },
      });
    }

    if (!rentalUnit) {
      throw new GraphQLError(
        `No rental unit with id = ${reserveRentalUnitInput.id_rental_unit}`,
        {
          extensions: {
            custom: true,
            code: codes.bad_user_input,
            status: 400,
          },
        },
      );
    }
    if (
      reserveRentalUnitInput.num_guests > rentalUnit.max_guests ||
      reserveRentalUnitInput.num_guests < 1
    ) {
      throw new GraphQLError(
        "Number of guests exceeds maximum for rental unit.",
        {
          extensions: {
            custom: true,
            code: codes.bad_user_input,
            status: 400,
          },
        },
      );
    }

    const available = await this.bookingService.checkIfRentalUnitAvailablable(
      rentalUnit,
      reserveRentalUnitInput.start_date,
      reserveRentalUnitInput.end_date,
    );

    if (!available) {
      throw new GraphQLError(
        "Rental unit is not available during requested dates.",
        {
          extensions: {
            custom: true,
            code: codes.bad_user_input,
            status: 400,
          },
        },
      );
    }

    const result = await this.bookingService.createBooking(
      reserveRentalUnitInput.start_date,
      reserveRentalUnitInput.end_date,
      reserveRentalUnitInput.num_guests,
      reserveRentalUnitInput.total_price,
      rentalUnit,
      guest,
    );

    return result;
  }

  async getTypesOfPlaces() {
    return await this.typeOfPlaceRepository.find();
  }

  async getAmenities() {
    return this.amenityRepository.find();
  }

  async getCountries() {
    return this.countryRepository.find();
  }

  async getCountryById(id: string) {
    return this.countryRepository.findOneByOrFail({ id });
  }

  async getStates(countryId: string) {
    return this.countryRepository
      .createQueryBuilder("country")
      .where({ id: countryId })
      .leftJoinAndMapMany(
        "country.states",
        State,
        "state",
        "state.countryId = country.id",
      )
      .getOne();
  }

  async getStateById(id: string) {
    return this.stateRepository.findOneByOrFail({ id });
  }

  async uploadImages(images: FileUpload[], rentalUnit: RentalUnit) {
    images.forEach(async (item, index) => {
      const imageInfo = await item;
      const { createReadStream, filename } = imageInfo;
      const stream = createReadStream();
      const newImageName = `${rentalUnit.id}-image-${index}.${
        filename.split(".")[1]
      }`;
      const uploadPath = `${UPLOAD_DIR}/${newImageName}`;

      await new Promise((_, reject) => {
        const writeStream = createWriteStream(uploadPath);
        writeStream.on("finish", async () => {
          const imageInRepo = this.rentalUnitImageRepository.create({
            rental_unit: rentalUnit,
            image_path: `/images/${newImageName}`,
          });
          await this.rentalUnitImageRepository.save(imageInRepo);
        });
        writeStream.on("error", (error) => {
          unlink(uploadPath, () => {
            reject(error);
          });
        });
        stream.on("error", (error) => writeStream.destroy(error));
        stream.pipe(writeStream);
      });
    });
  }

  async addRentalUnit(
    rentalUnitInput: AddRentalUnitInput,
    user: { id: string; email: string },
  ) {
    const {
      type_of_place_id,
      max_guests,
      num_bedrooms,
      num_beds,
      num_bathrooms,
      title,
      description,
      price,
      amenities_ids,
      id_country,
      id_state,
      city,
      street,
      zip,
      apartment,
      images,
    } = rentalUnitInput;

    const typeOfPlace = await this.typeOfPlaceRepository.findOneOrFail({
      where: { id: type_of_place_id },
    });

    const allAmenities = await this.getAmenities();

    const rentalUnitAmenitiesList = allAmenities.filter((amenity) =>
      amenities_ids.includes(amenity.id),
    );

    const rentalUnitAddress = this.rentalUnitAddressRepository.create({
      city,
      street,
      zip,
      apartment,
    });

    const country = await this.getCountryById(id_country);
    rentalUnitAddress.country = country;

    const savedRentalUnitAddress = await this.rentalUnitAddressRepository.save(
      rentalUnitAddress,
    );

    if (id_state) {
      const state = await this.getStateById(id_state);
      rentalUnitAddress.state = state;
    }

    const newRentalUnit = this.rentalUnitRepository.create({
      max_guests,
      num_bedrooms,
      num_beds,
      num_bathrooms,
      title,
      description,
      price,
      type_of_place: typeOfPlace,
      address: savedRentalUnitAddress,
    });

    const savedNewRentalUnit = await this.rentalUnitRepository.save(
      newRentalUnit,
    );

    if (savedNewRentalUnit) {
      rentalUnitAmenitiesList.forEach((amenity) => {
        const rentalUnitAmenityRecord = this.rentalUnitAmenityRepository.create(
          {
            rental_unit: savedNewRentalUnit,
            amenity,
          },
        );
        this.rentalUnitAmenityRepository.save(rentalUnitAmenityRecord);
      });

      await this.hostService.assignRentalUnitToHost(user, savedNewRentalUnit);

      await this.uploadImages(images, savedNewRentalUnit);
    }

    return savedNewRentalUnit;
  }
}
