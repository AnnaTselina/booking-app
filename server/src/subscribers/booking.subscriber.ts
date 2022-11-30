import { Booking } from "src/modules/booking/entities/booking.entity";
import { EntitySubscriberInterface, EventSubscriber } from "typeorm";

@EventSubscriber()
export class BookingSubscriner implements EntitySubscriberInterface<Booking> {
  listenTo() {
    return Booking;
  }

  async afterLoad(bookingEntity: Booking) {
    if (bookingEntity.start_date && bookingEntity.end_date) {
      bookingEntity.start_date = new Date(bookingEntity.start_date);
      bookingEntity.end_date = new Date(bookingEntity.end_date);
    }
  }
}
