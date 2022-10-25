import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import { User } from "src/modules/user/dto/entities/user.entity";
import { genSalt, hash } from "bcrypt";

@EventSubscriber()
export class UserSubscriner implements EntitySubscriberInterface<User> {
  //Indicates that this subscriber only listens to User events
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    const salt = await genSalt();
    event.entity.password_hash = await hash(event.entity.password_hash, salt);
  }
}
