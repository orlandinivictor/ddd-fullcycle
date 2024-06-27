import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { EventInterface } from "../../@shared/event.interface";

export class CustomerChangeAddressHandler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`
    );
  }
}
