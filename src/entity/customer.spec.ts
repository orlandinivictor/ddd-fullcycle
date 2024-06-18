import { Address } from "./address";
import { Customer } from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John");
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("1", "");
    }).toThrow("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("1", "John");
    customer.changeName("Victor");

    expect(customer.name).toBe("Victor");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "John");
    const address = new Address("Street 1", 123, "12345-678", "São Paulo");
    customer.Address = address;
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "John");
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "John");
      customer.activate();
    }).toThrow("Address is mandatory to activate a customer");
  });
});
