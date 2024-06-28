import { CustomerChangedAddressEvent } from "../../customer/event/customer-changed-address.event";
import { CustomerCreatedEvent } from "../../customer/event/customer-created.event";
import { CustomerChangeAddressHandler } from "../../customer/event/handler/customer-change-address.handler";
import { SendConsole1Handler } from "../../customer/event/handler/send-console-1.handler";
import { SendConsole2Handler } from "../../customer/event/handler/send-console-2.handler";
import { SendEmailWhenProductIsCreatedHandler } from "../../product/event/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../../product/event/product-created.event";
import { EventDispatcher } from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all events", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBe(
      undefined
    );
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      email: "orlandinivictor@outlook.com",
      name: "Product 1",
      description: "Product 1 description",
      price: 10,
    });
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });

  it("should dispatch console.log event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const console1Handler = new SendConsole1Handler();
    const console2Handler = new SendConsole2Handler();

    const spy1Handler = jest.spyOn(console1Handler, "handle");
    const spy2Handler = jest.spyOn(console2Handler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", console1Handler);
    eventDispatcher.register("CustomerCreatedEvent", console2Handler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(console1Handler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(console2Handler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      email: "orlandinivictor@outlook.com",
      name: "Victor Orlandini",
    });
    eventDispatcher.notify(customerCreatedEvent);

    expect(spy1Handler).toHaveBeenCalledTimes(1);
    expect(spy2Handler).toHaveBeenCalledTimes(1);
  });

  it("should dispatch change address event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const changeAddressHandler = new CustomerChangeAddressHandler();

    const spyChangeAddressHandler = jest.spyOn(changeAddressHandler, "handle");

    eventDispatcher.register(
      "CustomerChangedAddressEvent",
      changeAddressHandler
    );

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(changeAddressHandler);

    const customerChangeAddressEvent = new CustomerChangedAddressEvent({
      id: "1",
      nome: "Victor Orlandini",
      endereco: "Rua Dois",
    });
    eventDispatcher.notify(customerChangeAddressEvent);

    expect(spyChangeAddressHandler).toHaveBeenCalledTimes(1);
  });
});
