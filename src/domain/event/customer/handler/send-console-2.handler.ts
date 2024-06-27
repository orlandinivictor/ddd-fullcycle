import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { EventInterface } from "../../@shared/event.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

export class SendConsole2Handler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: EventInterface): void {
    console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
  }
}
